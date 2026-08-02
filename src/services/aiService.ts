// Client wrappers for the AI generation Cloud Functions (see docs/ai.md and
// functions/src/index.ts). Captions and AI images are produced server-side;
// user-supplied images are uploaded straight to Storage from the browser and
// then signed by the server.
//
// The brand kit / selections come from the /generate flow (Generate.vue).

import { httpsCallable } from 'firebase/functions'
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { functions, storage } from '../firebase'

/** Content theme, mirroring the server's supported themes. */
export type Theme =
  | 'promo'
  | 'announcement'
  | 'holiday'
  | 'tips'
  | 'general'
  | 'product'

/** Caption language, mirroring the server's supported languages. */
export type Language = 'Filipino' | 'Taglish' | 'English'

/** Shaped caption returned by `generateCaption`. */
export interface CaptionResult {
  caption: string
  headline: string
  subtext: string
}

/**
 * Requests a caption for the signed-in user. Tone/category come from the user's
 * brand kit server-side; only the theme, optional language, and optional context
 * are sent. `language` falls back to the brand kit's default when omitted.
 */
export async function generateCaption(params: {
  theme: Theme
  language?: Language
  context?: string
}): Promise<CaptionResult> {
  const callable = httpsCallable<typeof params, CaptionResult>(functions, 'generateCaption')
  const { data } = await callable(params)
  return data
}

/** Brand-kit fields the image composition uses. */
export interface ImageBrandKit {
  businessName?: string
  businessCategory?: string
}

/** An image reference: a signed, usable URL plus its Storage object path. */
export interface PostImage {
  imageUrl: string
  storagePath: string
}

/**
 * Requests an AI-generated branded image. Returns a signed URL (and the backing
 * Storage path) usable directly in the post preview and at publish time.
 */
export async function generateImage(params: {
  theme: Theme
  headline?: string
  subtext?: string
  brandKit?: ImageBrandKit
}): Promise<PostImage> {
  const callable = httpsCallable<typeof params, PostImage>(functions, 'generateImage')
  const { data } = await callable(params)
  return data
}

/** File extension for a given image MIME type, defaulting to `jpg`. */
function extensionForType(type: string): string {
  const map: Record<string, string> = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/webp': 'webp',
    'image/gif': 'gif',
  }
  return map[type] || 'jpg'
}

/** Max size for a user-uploaded post image (matches the UI hint). */
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

/**
 * Uploads a user-selected image straight to Storage (browser → Storage), then
 * asks the server to mint a signed URL for it. Replaces the old data-URL flow:
 * the image lives in Storage and is referenced by URL, not embedded.
 *
 * @param file the user-selected image file.
 * @param uid the owning user's uid; the object is namespaced under it.
 * @returns the signed URL and the Storage path of the uploaded image.
 */
export async function uploadPostImage(file: File, uid: string): Promise<PostImage> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.')
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Image must be under 10MB.')
  }

  const id = crypto.randomUUID()
  const path = `postImages/${uid}/uploaded/${id}.${extensionForType(file.type)}`

  await uploadBytes(storageRef(storage, path), file, { contentType: file.type })

  // Only the server can mint a signed URL; it also verifies the path is ours.
  const callable = httpsCallable<{ storagePath: string }, PostImage>(functions, 'getPostImageUrl')
  const { data } = await callable({ storagePath: path })
  return data
}
