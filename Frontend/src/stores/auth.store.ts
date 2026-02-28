// src/stores/auth.store.ts
import { defineStore } from "pinia"

interface User { email: string }

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") as string | null,
  }),

  getters: {
    isLogged: (state) => !!state.token,
  },

  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const res = await fetch("https://localhost:7278/Auth/Login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error("Credenciales incorrectas")

      const token = await res.text()
      this.token = token
      this.user  = { email }
      localStorage.setItem("token", token)
    },

    logout() {
      this.user  = null
      this.token = null
      localStorage.removeItem("token")
    },
  },
})