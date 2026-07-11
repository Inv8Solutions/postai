// src/stores/userStore.ts
import { defineStore } from 'pinia'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import router from '../router'

// Define the UserData interface
interface UserData {
  documentId: string
  email: string
  name?: string // Optional since login might not always have name
}

// Define the store state type
interface UserState {
  userId: string | null
  userEmail: string | null
  userName: string | null
  isAuthenticated: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userId: null,
    userEmail: null,
    userName: null,
    isAuthenticated: false,
  }),

  actions: {
    setUser(userData: UserData): void {
      this.userId = userData.documentId
      this.userEmail = userData.email
      this.userName = userData.name || 'User'
      this.isAuthenticated = true
    },

    clearUser(): void {
      this.userId = null
      this.userEmail = null
      this.userName = null
      this.isAuthenticated = false
    },

    async logout(): Promise<void> {
      try {
        await signOut(auth)
      } finally {
        this.clearUser()
        router.push('/auth')
      }
    },
  },

  getters: {
    getUserId: (state): string | null => state.userId,
    getUserEmail: (state): string | null => state.userEmail,
    getUserName: (state): string | null => state.userName,
  },
})
