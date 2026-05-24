import { defineStore } from "pinia"
import { useTheme }    from "vuetify"
import { i18n }        from "../plugins/i18n"

export type AppTheme  = "light" | "dark" | "warm"
export type AppLocale = "es" | "en"

export const useUIStore = defineStore("ui", {
  state: () => ({
    loading:      false,
    notification: null as string | null,
    theme:        (localStorage.getItem("theme")  ?? "light")  as AppTheme,
    locale:       (localStorage.getItem("locale") ?? "es")     as AppLocale,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    },

    notify(msg: string) {
      this.notification = msg
      setTimeout(() => { this.notification = null }, 3000)
    },

    clearNotification() {
      this.notification = null
    },

    setTheme(newTheme: AppTheme) {
      this.theme = newTheme
      localStorage.setItem("theme", newTheme)
      // Vuetify hook – called from component via useTheme()
    },

    setLocale(newLocale: AppLocale) {
      this.locale = newLocale
      localStorage.setItem("locale", newLocale)
      // @ts-ignore – vue-i18n composition API
      i18n.global.locale.value = newLocale
    },
  },
})