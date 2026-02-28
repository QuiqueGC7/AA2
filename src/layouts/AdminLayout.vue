<template>
  <div class="admin-layout">
    <Navbar />

    <div class="admin-body">
      <aside class="sidebar">
        <h3>Administración</h3>

        <RouterLink to="/admin" class="link">Dashboard</RouterLink>
        <RouterLink to="/admin/products" class="link">Productos</RouterLink>
        <RouterLink to="/admin/categories" class="link">Categorías</RouterLink>
      </aside>

      <main class="content">
        <Notification />
        <LoadingSpinner v-if="ui.loading" />

        <slot />
      </main>
    </div>
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
.admin-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.admin-body {
  display: flex;
  flex: 1;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #1f1f1f;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar h3 {
  margin-bottom: 1rem;
}

.link {
  color: white;
  text-decoration: none;
  padding: 0.4rem 0;
}

.link:hover {
  text-decoration: underline;
}

/* Content area */
.content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
  background: #f5f5f5;
}
</style>
