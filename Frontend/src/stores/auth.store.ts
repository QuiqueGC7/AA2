import { defineStore } from "pinia"

interface User {
  email: string
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user:  null as User | null,
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
      this.token  = token
      this.user   = { email }
      localStorage.setItem("token", token)
    },

    async register({ email, password, userName }: { email: string; password: string; userName: string }) {
      const res = await fetch("https://localhost:7278/Auth/Register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, userName }),
      })

      if (!res.ok) throw new Error("Error al registrar el usuario")
    },

    logout() {
      this.user  = null
      this.token = null
      localStorage.removeItem("token")
    },

    restoreSession() {
      const token = localStorage.getItem("token")
      if (token) {
        this.token = token
        try {
          const parts = token.split(".")
          const payload = JSON.parse(atob(parts[1] ?? ""))
          this.user = { email: payload.email ?? payload.sub ?? "" }
        } catch {
          // Si falla la decodificación, mantenemos el token pero sin datos de usuario
        }
      }
    },
  },
})