import { defineStore } from "pinia"

export type UserRole = "admin" | "user" | "guest"

export interface AuthUser {
  userId: number
  userName: string
  email: string
  role: UserRole
}

function decodeToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1] ?? ""))
    return {
      userId:   Number(payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ?? payload.sub ?? 0),
      userName: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]                 ?? payload.name ?? "",
      email:    payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]         ?? payload.email ?? "",
      role:    (payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]               ?? payload.role ?? "user") as UserRole,
    }
  } catch {
    return null
  }
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user:  null as AuthUser | null,
    token: localStorage.getItem("token") as string | null,
  }),

  getters: {
    isLogged:  (state) => !!state.token,
    isAdmin:   (state) => state.user?.role === "admin",
    isEditor:  (state) => state.user?.role === "admin" || state.user?.role === "user",
    userRole:  (state): UserRole => state.user?.role ?? "guest",
  },

  actions: {
    async login({ email, password }: { email: string; password: string }) {
      const res = await fetch("http://localhost:5167/Auth/Login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error("Credenciales incorrectas")

      const token = await res.text()
      this.token  = token
      this.user   = decodeToken(token)
      localStorage.setItem("token", token)
    },

    async register({ email, password, userName }: { email: string; password: string; userName: string }) {
      const res = await fetch("http://localhost:5167/Auth/Register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, password, userName }),
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
        this.user  = decodeToken(token)
      }
    },
  },
})