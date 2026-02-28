<template>
  <v-app-bar color="surface" elevation="2" border="b">

    <!-- Logo -->
    <v-app-bar-title>
      <RouterLink to="/" class="logo-link">
        <v-icon color="primary" class="mr-1">mdi-store</v-icon>
        <span class="text-primary font-weight-bold">MiRestaurante</span>
      </RouterLink>
    </v-app-bar-title>

    <!-- Links públicos -->
    <v-btn variant="text" to="/" exact>Inicio</v-btn>
    <v-btn variant="text" to="/products">Productos</v-btn>

    <v-spacer />

    <!-- Sin sesión -->
    <template v-if="!auth.isLogged">
      <v-btn variant="text" to="/login">Login</v-btn>
      <v-btn variant="flat" to="/register">Registro</v-btn>
    </template>

    <!-- Con sesión -->
    <template v-else>
      <v-btn variant="text" to="/admin" prepend-icon="mdi-view-dashboard">
        Admin
      </v-btn>
      <v-btn
        variant="outlined"
        color="error"
        prepend-icon="mdi-logout"
        class="mr-2"
        @click="logout"
      >
        Salir
      </v-btn>
    </template>

  </v-app-bar>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store"
import { useRouter } from "vue-router"

const auth   = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push("/")
}
</script>

<style scoped>
.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}
</style>