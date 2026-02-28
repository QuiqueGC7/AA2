<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

import PublicLayout from "./layouts/PublicLayout.vue"
import AdminLayout  from "./layouts/AdminLayout.vue"
import AuthLayout   from "./layouts/AuthLayout.vue"   

const route = useRoute()

const layoutComponent = computed(() => {
  if (route.meta.layout === "admin")  return AdminLayout
  if (route.meta.layout === "auth")   return AuthLayout 
  return PublicLayout
})
</script>