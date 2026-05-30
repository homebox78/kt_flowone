import { defineStore } from 'pinia'
import { STORAGE_KEYS } from '@/constants'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || 'null'),
    token: localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) || '',
  }),
  getters: {
    isLoggedIn: (s) => !!s.token,
  },
  actions: {
    setSession({ user, token }) {
      this.user = user
      this.token = token
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
    },
    logout() {
      this.user = null
      this.token = ''
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.USER)
    },
  },
})
