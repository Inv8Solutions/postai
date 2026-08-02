// Firebase Storage helpers for post images.
//
// The AI pipeline renders raw image bytes (see functions/src/ai); this module
// persists them and mints the URL clients use. User-uploaded images take the
// client-direct path — the browser uploads straight to Storage with the client
// SDK, then calls back to sign the resulting object (see getPostImageUrl in
// index.ts). Both paths converge on getSignedReadUrl, so the URL policy is the
// same everywhere.

import { getStorage } from "firebase-admin/storage";
import { defineString } from "firebase-functions/params";

// Storage bucket override. Empty → the app's default bucket (from
// FIREBASE_CONFIG in the Functions runtime), which is the normal case.
const storageBucketName = defineString("STORAGE_BUCKET", { default: "" });

/**
 * Lifetime of the read URLs we mint. Signed URLs expire; a week comfortably
 * covers preview, scheduling, and the publish fetch (Facebook caches the image
 * on publish, so post-expiry access is not required).
 */
export const SIGNED_URL_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/** Root prefix for all post images, namespaced per user. */
const POST_IMAGE_ROOT = "postImages";

/** How a post image entered Storage. Drives its object path. */
export type PostImageKind = "generated" | "uploaded";

/**
 * @return {object} the configured Storage bucket.
 */
function bucket() {
  const name = storageBucketName.value();
  return name ? getStorage().bucket(name) : getStorage().bucket();
}

/**
 * Builds the Storage object path for a post image. Pure (id is passed in) so it
 * is unit-testable and the callers control id generation.
 * @param {string} uid owning user's uid.
 * @param {object} opts path parts (kind, id, extension).
 * @return {string} the object path, e.g. "postImages/u1/generated/abc.svg".
 */
export function postImagePath(
  uid: string,
  opts: { kind: PostImageKind; id: string; extension: string },
): string {
  return `${POST_IMAGE_ROOT}/${uid}/${opts.kind}/${opts.id}.${opts.extension}`;
}

/**
 * Whether `path` is a post-image object owned by `uid`. Guards the sign
 * endpoint against signing arbitrary objects (IDOR) — a caller may only sign
 * paths under their own prefix, and never a traversal path.
 * @param {string} uid the calling user's uid.
 * @param {string} path the object path to check.
 * @return {boolean} true if the path is owned by the user and well-formed.
 */
export function isOwnedPostImagePath(uid: string, path: string): boolean {
  if (typeof path !== "string" || path.length === 0) return false;
  if (path.includes("..")) return false;
  return path.startsWith(`${POST_IMAGE_ROOT}/${uid}/`);
}

/** Options for {@link uploadImage}. */
export interface UploadImageOptions {
  /** Destination object path (see {@link postImagePath}). */
  path: string;
  /** Raw bytes to write. */
  data: Buffer;
  /** MIME type stored on the object. */
  contentType: string;
}

/**
 * Uploads image bytes to the bucket at `path`, overwriting any existing object.
 * @param {UploadImageOptions} options destination + payload.
 * @return {Promise<void>} resolves once the object is written.
 */
export async function uploadImage(options: UploadImageOptions): Promise<void> {
  await bucket()
    .file(options.path)
    .save(options.data, {
      resumable: false,
      contentType: options.contentType,
      metadata: { contentType: options.contentType },
    });
}

/**
 * Mints a time-limited v4 signed read URL for an object.
 * @param {string} path the object path to sign.
 * @param {number} now current epoch ms; injectable for tests.
 * @return {Promise<string>} a signed URL valid for {@link SIGNED_URL_TTL_MS}.
 */
export async function getSignedReadUrl(
  path: string,
  now: number = Date.now(),
): Promise<string> {
  const [url] = await bucket()
    .file(path)
    .getSignedUrl({
      version: "v4",
      action: "read",
      expires: now + SIGNED_URL_TTL_MS,
    });
  return url;
}

/**
 * Whether an object exists in the bucket.
 * @param {string} path the object path to check.
 * @return {Promise<boolean>} true if the object exists.
 */
export async function fileExists(path: string): Promise<boolean> {
  const [exists] = await bucket().file(path).exists();
  return exists;
}
