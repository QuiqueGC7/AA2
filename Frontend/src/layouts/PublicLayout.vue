<template>
  <v-app>
    <Navbar />

    <v-main>
      <Notification />
      <LoadingSpinner v-if="ui.loading" />
      <slot />
    </v-main>

    <v-footer color="surface" border="t" class="text-center text-caption py-3">
      © {{ new Date().getFullYear() }} MiTienda — Todos los derechos reservados
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import Navbar          from "../components/common/Navbar.vue"
import Notification    from "../components/ui/Notification.vue"
import LoadingSpinner  from "../components/ui/LoadingSpinner.vue"
import { useUIStore }  from "../stores/ui.store"

const ui = useUIStore()
</script>