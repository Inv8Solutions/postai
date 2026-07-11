import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'
import { useUserStore } from '../stores/userStore'

let resolveAuthReady: () => void
export const authReady = new Promise<void>((resolve) => {
  resolveAuthReady = resolve
})

export function initAuthListener(): void {
  const userStore = useUserStore()

  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      try {
        const userDocRef = doc(db, 'users', firebaseUser.uid)
        const userDocSnap = await getDoc(userDocRef)

        if (userDocSnap.exists()) {
          const profile = userDocSnap.data()
          userStore.setUser({
            documentId: firebaseUser.uid,
            email: firebaseUser.email ?? '',
            name: profile.name,
          })
        } else {
          userStore.clearUser()
        }
      } catch (error) {
        console.error('Failed to load user profile on auth restore:', error)
        userStore.clearUser()
      }
    } else {
      userStore.clearUser()
    }

    resolveAuthReady()
  })
}
