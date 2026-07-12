// Facebook JS SDK integration for connecting a user's Facebook Page.
//
// Flow (client side):
//   1. loadFacebookSdk()  — inject + init the SDK with VITE_META_APP_ID
//   2. facebookLogin()    — open the login dialog, get a short-lived USER token
//   3. fetchManagedPages()— list the Pages the user manages (name/photo/followers)
//   4. exchangeFacebookToken() — hand the user token + chosen page to the
//      server-side Cloud Function, which swaps it for a long-lived PAGE token and
//      persists it under users/{uid}/facebookConnection/{pageId}. That callable
//      is delivered by the next issue; the token never touches the client.
//
// See docs/facebook.md for app setup, scopes, and token-handling rules.
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase'

const APP_ID = import.meta.env.VITE_META_APP_ID
/** Graph API version pinned so responses stay stable across SDK updates. */
const GRAPH_VERSION = 'v21.0'

/** OAuth scopes requested at login (see docs/facebook.md → Scopes). */
export const FACEBOOK_SCOPES = [
  'pages_show_list',
  'pages_read_engagement',
  'pages_manage_posts',
] as const

/** A Page the user manages, as surfaced in the picker and connected card. */
export interface ManagedPage {
  id: string
  name: string
  category: string
  followers: number
  pictureUrl: string
}

/** Result of a successful Facebook login. */
export interface FacebookAuth {
  /** Short-lived user access token — exchanged server-side, never persisted here. */
  userAccessToken: string
  userId: string
}

// ─── Minimal typings for the injected global SDK ────────────────────────────
interface FbAuthResponse {
  accessToken: string
  userID: string
  grantedScopes?: string
}
interface FbLoginResponse {
  status: string
  authResponse: FbAuthResponse | null
}
interface FbSdk {
  init(params: { appId: string; cookie?: boolean; xfbml?: boolean; version: string }): void
  login(
    cb: (response: FbLoginResponse) => void,
    options?: { scope?: string; return_scopes?: boolean },
  ): void
  api(
    path: string,
    method: string,
    params: Record<string, unknown>,
    cb: (response: any) => void,
  ): void
}

declare global {
  interface Window {
    FB?: FbSdk
    fbAsyncInit?: () => void
  }
}

let sdkPromise: Promise<void> | null = null

/** Loads and initialises the Facebook JS SDK exactly once. */
export function loadFacebookSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise

  sdkPromise = new Promise<void>((resolve, reject) => {
    if (!APP_ID) {
      reject(new Error('Missing VITE_META_APP_ID — add it to your .env (see docs/facebook.md).'))
      return
    }
    if (window.FB) {
      resolve()
      return
    }

    window.fbAsyncInit = () => {
      window.FB!.init({
        appId: APP_ID,
        cookie: true,
        xfbml: false,
        version: GRAPH_VERSION,
      })
      resolve()
    }

    const scriptId = 'facebook-jssdk'
    if (document.getElementById(scriptId)) return // fbAsyncInit will still fire

    const script = document.createElement('script')
    script.id = scriptId
    script.src = 'https://connect.facebook.net/en_US/sdk.js'
    script.async = true
    script.defer = true
    script.crossOrigin = 'anonymous'
    script.onerror = () => {
      sdkPromise = null // allow a retry on the next attempt
      reject(new Error('Failed to load the Facebook SDK. Check your connection and try again.'))
    }
    document.head.appendChild(script)
  })

  return sdkPromise
}

/** Opens the Facebook login dialog and resolves with a short-lived user token. */
export async function facebookLogin(): Promise<FacebookAuth> {
  await loadFacebookSdk()
  return new Promise<FacebookAuth>((resolve, reject) => {
    window.FB!.login(
      (response) => {
        if (response.status === 'connected' && response.authResponse) {
          resolve({
            userAccessToken: response.authResponse.accessToken,
            userId: response.authResponse.userID,
          })
        } else {
          reject(new Error('Facebook login was cancelled or not authorised.'))
        }
      },
      { scope: FACEBOOK_SCOPES.join(','), return_scopes: true },
    )
  })
}

/** Fetches the Pages the logged-in user manages (name, photo, follower count). */
export function fetchManagedPages(userAccessToken: string): Promise<ManagedPage[]> {
  return new Promise<ManagedPage[]>((resolve, reject) => {
    window.FB!.api(
      '/me/accounts',
      'get',
      {
        access_token: userAccessToken,
        fields: 'id,name,category,fan_count,picture{url}',
        limit: 100,
      },
      (response) => {
        if (!response || response.error) {
          reject(new Error(response?.error?.message || 'Could not load your Facebook Pages.'))
          return
        }
        const pages: ManagedPage[] = (response.data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          category: p.category || '',
          followers: p.fan_count ?? 0,
          pictureUrl: p.picture?.data?.url || '',
        }))
        resolve(pages)
      },
    )
  })
}

/** What the server-side exchange returns once the connection is persisted. */
export interface ExchangeResult {
  pageId: string
  pageName: string
}

/**
 * Hands the short-lived user token + chosen page id to the server-side exchange
 * (Cloud Function `exchangeFacebookToken`). The function swaps them for a
 * long-lived Page token and stores it server-only. Delivered by the next issue.
 */
export async function exchangeFacebookToken(params: {
  userAccessToken: string
  pageId: string
}): Promise<ExchangeResult> {
  const callable = httpsCallable<typeof params, ExchangeResult>(functions, 'exchangeFacebookToken')
  const { data } = await callable(params)
  return data
}
