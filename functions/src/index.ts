import { onRequest, onCall, HttpsError } from "firebase-functions/v2/https";
import { defineString, defineSecret } from "firebase-functions/params";
import * as logger from "firebase-functions/logger";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

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
