<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRoute } from "vue-router"

// Importa los layouts
import PublicLayout from "@/layouts/PublicLayout.vue"
import AdminLayout from "@/layouts/AdminLayout.vue"

const route = useRoute()

// Decide qué layout usar según la ruta
const layoutComponent = computed(() => {
  return route.meta.layout === "admin" ? AdminLayout : PublicLayout
})
</script>

