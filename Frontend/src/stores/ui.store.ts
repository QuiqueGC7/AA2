import { defineStore } from "pinia"

export const useUIStore = defineStore("ui", {
  state: () => ({
    loading: false,
    notification: null as string | null,
  }),

  actions: {
    setLoading(value: boolean) {
      this.loading = value
    },
    notify(msg: string) {
      this.notification = msg
      setTimeout(() => (this.notification = null), 3000)
    
    },
    clearNotification() {
         this.notification = null }
    },
})
