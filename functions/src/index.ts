import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import { defineString, defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { randomUUID } from "node:crypto";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getImageProvider, getTextProvider } from "./ai/index.js";
import {
  SUPPORTED_LANGUAGES,
  SUPPORTED_THEMES,
  CaptionValidationError,
  resolveCaptionInput,
} from "./ai/captionRequest.js";
import type { BrandKit, RawCaptionRequest } from "./ai/captionRequest.js";
import {
  ImageValidationError,
  resolveImageInput,
} from "./ai/imageRequest.js";
import type { RawImageRequest } from "./ai/imageRequest.js";
import {
  getSignedReadUrl,
  isOwnedPostImagePath,
  postImagePath,
  uploadImage,
  fileExists,
} from "./storage.js";
import { RateLimiter } from "./rateLimiter.js";

initializeApp();
const db = getFirestore();

// Meta app credentials. The App ID is public (non-secret param); the App Secret
// is a Secret Manager secret and must never reach the client. See docs/facebook.md.
const metaAppId = defineString("META_APP_ID", { default: "" });
const metaAppSecret = defineSecret("META_APP_SECRET");

const GRAPH_VERSION = "v21.0";
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`;

export const healthcheck = onRequest((req, res) => {
  res.status(200).json({ status: "ok", timestamp: Date.now() });
});

// Callable: generate a post's caption + image through the configured AI
// providers (see functions/src/ai and docs/ai.md). Which providers run is a
// deploy-time config choice (AI_TEXT_PROVIDER / AI_IMAGE_PROVIDER); the default
// placeholder providers make this pipeline runnable end-to-end with no vendor.
// This does not persist a post or spend credits — those are separate steps.
export const generatePost = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be signed in to generate a post.",
    );
  }

  const data = request.data as {
    language?: string;
    theme?: string;
    businessName?: string;
    businessCategory?: string;
    context?: string;
  };

  // Validate the two enum inputs; free-text fields are passed through trimmed.
  const language = SUPPORTED_LANGUAGES.find((l) => l === data?.language);
  const theme = SUPPORTED_THEMES.find((t) => t === data?.theme);
  if (!language || !theme) {
    throw new HttpsError(
      "invalid-argument",
      `A valid language (${SUPPORTED_LANGUAGES.join(", ")}) and theme (${SUPPORTED_THEMES.join(", ")}) are required.`,
    );
  }

  const businessName = (data?.businessName ?? "").trim() || undefined;
  const businessCategory = (data?.businessCategory ?? "").trim() || undefined;
  const context = (data?.context ?? "").trim() || undefined;

  try {
    const textProvider = getTextProvider();
    const imageProvider = getImageProvider();

    // Caption first, so the generated headline/subtext can be composed onto the
    // image — keeping the art and the copy consistent.
    const text = await textProvider.generateCaption({
      language,
      theme,
      businessName,
      businessCategory,
      context,
    });

    const rendered = await imageProvider.generateImage({
      theme,
      headline: text.headline,
      subtext: text.subtext,
      businessName,
      businessCategory,
    });

    // Persist the rendered bytes and hand back a signed URL (never a data URI).
    const path = postImagePath(uid, {
      kind: "generated",
      id: randomUUID(),
      extension: rendered.extension,
    });
    await uploadImage({
      path,
      data: rendered.data,
      contentType: rendered.contentType,
    });
    const imageUrl = await getSignedReadUrl(path);

    logger.info("Post generated", {
      uid,
      theme,
      language,
      textProvider: textProvider.id,
      imageProvider: imageProvider.id,
    });

    return {
      caption: text.caption,
      headline: text.headline,
      subtext: text.subtext,
      imageUrl,
      storagePath: path,
    };
  } catch (err) {
    logger.error("generatePost failed", {
      uid,
      message: err instanceof Error ? err.message : String(err),
    });
    throw new HttpsError(
      "internal",
      "We couldn't generate your post. Please try again.",
    );
  }
});

// Basic per-user throttle for caption generation. In-memory and per-instance
// (see RateLimiter) — a lightweight abuse guard, not a billing quota.
const captionRateLimiter = new RateLimiter({ maxRequests: 15, windowMs: 60_000 });

// Callable: generate just a caption (caption + headline + subtext) for the
// signed-in user, driven by their brand kit and the chosen theme/language plus
// optional context. Unlike generatePost, the tone/category/name come from the
// brand kit persisted at sign-up (users/{uid}) rather than the request — this is
// the first server code to read those fields back. No post is persisted here.
export const generateCaption = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be signed in to generate a caption.",
    );
  }

  if (!captionRateLimiter.tryConsume(uid)) {
    throw new HttpsError(
      "resource-exhausted",
      "You're generating captions too quickly. Please wait a moment and try again.",
    );
  }

  const raw = request.data as RawCaptionRequest;

  try {
    // Load the brand kit stored at sign-up. A missing/partial profile is fine —
    // resolveCaptionInput fills sensible defaults (e.g. language) so a caption
    // still generates.
    const snap = await db.collection("users").doc(uid).get();
    const profile = snap.data() ?? {};
    const brandKit: BrandKit = {
      businessName: asString(profile.businessName),
      businessCategory: asString(profile.businessCategory),
      brandTone: asString(profile.brandTone),
      language: asString(profile.language),
    };

    let input;
    try {
      input = resolveCaptionInput(raw, brandKit);
    } catch (err) {
      if (err instanceof CaptionValidationError) {
        throw new HttpsError("invalid-argument", err.message);
      }
      throw err;
    }

    const textProvider = getTextProvider();
    const result = await textProvider.generateCaption(input);

    logger.info("Caption generated", {
      uid,
      theme: input.theme,
      language: input.language,
      textProvider: textProvider.id,
    });

    return {
      caption: result.caption,
      headline: result.headline,
      subtext: result.subtext,
    };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    logger.error("generateCaption failed", {
      uid,
      message: err instanceof Error ? err.message : String(err),
    });
    throw new HttpsError(
      "internal",
      "We couldn't generate your caption. Please try again.",
    );
  }
});

/**
 * Narrows an unknown Firestore field to a trimmed string, or undefined.
 * @param {unknown} value raw field value.
 * @return {string | undefined} the string value, or undefined if not a string.
 */
function asString(value: unknown): string | undefined {
  return typeof value === "string" ? value : undefined;
}

// Basic per-user throttle for image generation/signing. In-memory, per-instance
// (see RateLimiter) — a lightweight abuse guard, not a billing quota.
const imageRateLimiter = new RateLimiter({ maxRequests: 15, windowMs: 60_000 });

// Callable: render a branded image for a post through the configured image
// provider, upload it to Firebase Storage, and return a signed download URL.
// Business fields come from the request's `brandKit` (the client already holds
// it). No post is persisted here.
export const generateImage = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be signed in to generate an image.",
    );
  }

  if (!imageRateLimiter.tryConsume(uid)) {
    throw new HttpsError(
      "resource-exhausted",
      "You're generating images too quickly. Please wait a moment and try again.",
    );
  }

  const raw = request.data as RawImageRequest;

  let input;
  try {
    input = resolveImageInput(raw);
  } catch (err) {
    if (err instanceof ImageValidationError) {
      throw new HttpsError("invalid-argument", err.message);
    }
    throw err;
  }

  try {
    const imageProvider = getImageProvider();
    const rendered = await imageProvider.generateImage(input);

    const path = postImagePath(uid, {
      kind: "generated",
      id: randomUUID(),
      extension: rendered.extension,
    });
    await uploadImage({
      path,
      data: rendered.data,
      contentType: rendered.contentType,
    });
    const imageUrl = await getSignedReadUrl(path);

    logger.info("Image generated", {
      uid,
      theme: input.theme,
      imageProvider: imageProvider.id,
    });

    return { imageUrl, storagePath: path };
  } catch (err) {
    logger.error("generateImage failed", {
      uid,
      message: err instanceof Error ? err.message : String(err),
    });
    throw new HttpsError(
      "internal",
      "We couldn't generate your image. Please try again.",
    );
  }
});

// Callable: mint a signed URL for a user-uploaded post image. Uploads take the
// client-direct path — the browser writes the file straight to Storage with the
// client SDK, then calls this to get a signed URL (which only the server can
// mint). The caller may only sign objects under their own postImages/{uid}/…
// prefix, so this can't be used to read someone else's files.
export const getPostImageUrl = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be signed in to access a post image.",
    );
  }

  if (!imageRateLimiter.tryConsume(uid)) {
    throw new HttpsError(
      "resource-exhausted",
      "Too many requests. Please wait a moment and try again.",
    );
  }

  const data = request.data as { storagePath?: string };
  const storagePath = (data?.storagePath ?? "").trim();
  if (!storagePath || !isOwnedPostImagePath(uid, storagePath)) {
    throw new HttpsError(
      "invalid-argument",
      "A valid storage path for one of your uploads is required.",
    );
  }

  try {
    if (!(await fileExists(storagePath))) {
      throw new HttpsError(
        "not-found",
        "That image doesn't exist. Please upload it again.",
      );
    }

    const imageUrl = await getSignedReadUrl(storagePath);
    logger.info("Post image signed", { uid, storagePath });
    return { imageUrl, storagePath };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    logger.error("getPostImageUrl failed", {
      uid,
      storagePath,
      message: err instanceof Error ? err.message : String(err),
    });
    throw new HttpsError(
      "internal",
      "We couldn't load your image. Please try again.",
    );
  }
});

interface GraphError {
  message?: string;
  code?: number;
  type?: string;
}

interface GraphBody {
  error?: GraphError;
  [key: string]: unknown;
}

// Performs a Graph API GET and returns the parsed body, throwing on any
// Graph-level error. Tokens are passed in params and never logged.
const graphGet = async (
  path: string,
  params: Record<string, string>,
): Promise<GraphBody> => {
  const url = new URL(`${GRAPH_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString());
  const body = (await response.json()) as GraphBody;

  if (!response.ok || body.error) {
    logger.error("Graph API error", {
      path,
      status: response.status,
      code: body.error?.code,
      type: body.error?.type,
      message: body.error?.message,
    });
    throw new Error(body.error?.message ?? "Graph API request failed.");
  }
  return body;
};

// Performs a Graph API DELETE and returns the parsed body, throwing on any
// Graph-level error. Tokens are passed in params and never logged.
const graphDelete = async (
  path: string,
  params: Record<string, string>,
): Promise<GraphBody> => {
  const url = new URL(`${GRAPH_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }

  const response = await fetch(url.toString(), { method: "DELETE" });
  const body = (await response.json()) as GraphBody;

  if (!response.ok || body.error) {
    logger.error("Graph API error", {
      path,
      status: response.status,
      code: body.error?.code,
      type: body.error?.type,
      message: body.error?.message,
    });
    throw new Error(body.error?.message ?? "Graph API request failed.");
  }
  return body;
};

// Callable: exchange a short-lived user token for a long-lived Page token and
// persist the connection under users/{uid}/facebookConnection/{pageId}. The Page
// token is a server-only field — only non-sensitive metadata is returned.
export const connectFacebookPage = onCall(
  { secrets: [metaAppSecret] },
  async (request) => {
    const uid = request.auth?.uid;
    if (!uid) {
      throw new HttpsError(
        "unauthenticated",
        "You must be signed in to connect a Facebook Page.",
      );
    }

    const data = request.data as { shortLivedToken?: string; pageId?: string };
    const shortLivedToken = (data?.shortLivedToken ?? "").trim();
    const pageId = (data?.pageId ?? "").trim();
    if (!shortLivedToken || !pageId) {
      throw new HttpsError(
        "invalid-argument",
        "A Facebook token and a Page id are both required.",
      );
    }

    const appId = metaAppId.value();
    const appSecret = metaAppSecret.value();
    if (!appId || !appSecret) {
      logger.error("Missing Meta app credentials (META_APP_ID/META_APP_SECRET).");
      throw new HttpsError(
        "failed-precondition",
        "The Facebook integration is not configured yet. Please try again later.",
      );
    }

    try {
      // 1. Short-lived user token -> long-lived user token.
      const longLived = await graphGet("/oauth/access_token", {
        grant_type: "fb_exchange_token",
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: shortLivedToken,
      });
      const longLivedUserToken = longLived.access_token as string | undefined;
      if (!longLivedUserToken) {
        throw new Error("No long-lived user token returned by Graph API.");
      }

      // 2. Long-lived user token -> Page access token (+ name). A Page token
      // derived from a long-lived user token does not expire.
      const page = await graphGet(`/${encodeURIComponent(pageId)}`, {
        fields: "id,name,access_token",
        access_token: longLivedUserToken,
      });
      const pageAccessToken = page.access_token as string | undefined;
      const pageName = (page.name as string | undefined) ?? "Facebook Page";
      if (!pageAccessToken) {
        // The user authenticated but isn't an admin of the requested Page.
        throw new HttpsError(
          "permission-denied",
          "You don't manage this Facebook Page, so it can't be connected.",
        );
      }

      // 3. Record which scopes the user actually granted.
      const perms = await graphGet("/me/permissions", {
        access_token: longLivedUserToken,
      });
      const permData =
        (perms.data as Array<{ permission: string; status: string }>) ?? [];
      const scopes = permData
        .filter((p) => p.status === "granted")
        .map((p) => p.permission);

      // 4. Verify the Page token works with a test call: GET /{page-id}.
      await graphGet(`/${encodeURIComponent(pageId)}`, {
        fields: "id",
        access_token: pageAccessToken,
      });

      // 5. Persist. pageAccessToken is server-only (see docs/data-model.md).
      await db
        .collection("users")
        .doc(uid)
        .collection("facebookConnection")
        .doc(pageId)
        .set({
          pageId,
          pageName,
          pageAccessToken,
          scopes,
          connectedAt: FieldValue.serverTimestamp(),
        });

      logger.info("Facebook Page connected", {
        uid,
        pageId,
        scopeCount: scopes.length,
      });

      // 6. Return only non-sensitive metadata to the client.
      return { pageId, pageName, scopes };
    } catch (err) {
      if (err instanceof HttpsError) throw err;
      logger.error("connectFacebookPage failed", {
        uid,
        pageId,
        message: err instanceof Error ? err.message : String(err),
      });
      throw new HttpsError(
        "internal",
        "We couldn't connect your Facebook Page. Please try again.",
      );
    }
  },
);

// Callable: disconnect a previously connected Page. Deletes the stored
// connection document (which holds the server-only Page access token) and makes
// a best-effort call to revoke the app's Graph permissions. Deleting the stored
// token is the source of truth — it always runs even if revocation fails, so a
// successful call returns the user to the not-connected state.
export const disconnectFacebookPage = onCall(async (request) => {
  const uid = request.auth?.uid;
  if (!uid) {
    throw new HttpsError(
      "unauthenticated",
      "You must be signed in to disconnect a Facebook Page.",
    );
  }

  const data = request.data as { pageId?: string };
  const pageId = (data?.pageId ?? "").trim();
  if (!pageId) {
    throw new HttpsError(
      "invalid-argument",
      "A Page id is required to disconnect.",
    );
  }

  const docRef = db
    .collection("users")
    .doc(uid)
    .collection("facebookConnection")
    .doc(pageId);

  try {
    const snap = await docRef.get();
    // Grab the token before deleting so we can attempt Graph revocation. If the
    // connection doesn't exist we treat the disconnect as already done
    // (idempotent) rather than erroring.
    const pageAccessToken = snap.exists
      ? (snap.data()?.pageAccessToken as string | undefined)
      : undefined;

    // Delete first — removing the stored token is the acceptance criterion and
    // must not be blocked by a flaky Graph call.
    await docRef.delete();

    // Best-effort permission revocation with the Page token. Non-fatal: the
    // token is already gone, so a failure here doesn't leave a live connection.
    let revoked = false;
    if (pageAccessToken) {
      try {
        await graphDelete("/me/permissions", { access_token: pageAccessToken });
        revoked = true;
      } catch (revokeErr) {
        logger.warn("Facebook permission revocation failed (non-fatal)", {
          uid,
          pageId,
          message:
            revokeErr instanceof Error ? revokeErr.message : String(revokeErr),
        });
      }
    }

    logger.info("Facebook Page disconnected", { uid, pageId, revoked });
    return { pageId, revoked };
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    logger.error("disconnectFacebookPage failed", {
      uid,
      pageId,
      message: err instanceof Error ? err.message : String(err),
    });
    throw new HttpsError(
      "internal",
      "We couldn't disconnect your Facebook Page. Please try again.",
    );
  }
});
