<template>
  <v-app>
    <Navbar />

    <!-- Sidebar -->
    <v-navigation-drawer permanent color="grey-darken-4" width="230">

      <v-list-item
        prepend-icon="mdi-silverware-fork-knife"
        title="Restaurante"
        class="py-4"
        nav
      />

      <v-divider />

      <v-list density="compact" nav class="mt-2">
        <v-list-item
          prepend-icon="mdi-view-dashboard-outline"
          title="Dashboard"
          to="/admin"
          exact
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-food"
          title="Platos"
          to="/admin/platos"
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-cup"
          title="Bebidas"
          to="/admin/bebidas"
          rounded="lg"
          active-color="primary"
        />
        <v-list-item
          prepend-icon="mdi-cake"
          title="Postres"
          to="/admin/postres"
          rounded="lg"
          active-color="primary"
        />
      </v-list>

      <!-- Usuario activo al pie -->
      <template #append>
        <v-divider />
        <v-list density="compact" nav class="my-2">
          <v-list-item
            prepend-icon="mdi-account-circle-outline"
            :title="auth.user?.email ?? ''"
            subtitle="Administrador"
          />
        </v-list>
      </template>

    </v-navigation-drawer>

    <!-- Contenido principal -->
    <v-main>
      <Notification />
      <LoadingSpinner v-if="ui.loading" />
      <v-container fluid class="pa-6">
        <slot />
      </v-container>
    </v-main>

  </v-app>
</template>

<script setup lang="ts">
import Navbar         from "../components/common/Navbar.vue"
import Notification   from "../components/ui/Notification.vue"
import LoadingSpinner from "../components/ui/LoadingSpinner.vue"
import { useUIStore }   from "../stores/ui.store"
import { useAuthStore } from "../stores/auth.store"

const ui   = useUIStore()
const auth = useAuthStore()
</script>