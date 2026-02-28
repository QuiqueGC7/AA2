<template>
  <div class="public-layout">
    <Navbar />

    <main class="content">
      <Notification />
      <LoadingSpinner v-if="ui.loading" />

      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from "../components/common/Navbar.vue"
import Notification from "../components/ui/Notification.vue"
import LoadingSpinner from "../components/ui/LoadingSpinner.vue"
import { useUIStore } from "../stores/ui.store"

const ui = useUIStore()
</script>

<style scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 2rem;
  background: #f8f8f8;
}
</style>
