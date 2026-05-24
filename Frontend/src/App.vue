<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRoute }            from "vue-router"
import { useTheme }            from "vuetify"
import { useAuthStore }        from "./stores/auth.store"
import { useUIStore }          from "./stores/ui.store"

import PublicLayout from "./layouts/PublicLayout.vue"
import AdminLayout  from "./layouts/AdminLayout.vue"
import AuthLayout   from "./layouts/AuthLayout.vue"

const authStore = useAuthStore()
const uiStore   = useUIStore()
const theme     = useTheme()
const route     = useRoute()

// Restaurar sesión y tema guardados en localStorage
authStore.restoreSession()
theme.global.name.value = uiStore.theme

const layoutComponent = computed(() => {
  if (route.meta.layout === "admin") return AdminLayout
  if (route.meta.layout === "auth")  return AuthLayout
  return PublicLayout
})
</script>