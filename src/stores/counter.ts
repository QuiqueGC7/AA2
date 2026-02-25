import { defineStore } from "pinia"

interface User {
  email: string
}

interface LoginPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isLogged: (state) => !!state.user,
  },

  actions: {
    async login({ email, password }: LoginPayload) {
      if (email === "admin@test.com" && password === "1234") {
        this.user = { email }
      } else {
        throw new Error("Credenciales incorrectas")
      }
    },

    logout() {
      this.user = null
    },
  },
})
