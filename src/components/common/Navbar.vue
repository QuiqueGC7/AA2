<template>
  <nav class="navbar">
    <div class="left">
      <RouterLink to="/" class="logo">MiTienda</RouterLink>

      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/products" class="nav-link">Productos</RouterLink>
    </div>

    <div class="right">
      <template v-if="!auth.isLogged">
        <RouterLink to="/login" class="nav-link">Login</RouterLink>
        <RouterLink to="/register" class="nav-link">Registro</RouterLink>
      </template>

      <template v-else>
        <RouterLink to="/admin" class="nav-link">Admin</RouterLink>
        <button @click="logout" class="logout-btn">Salir</button>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../stores/auth.store"
import { useRouter } from "vue-router"

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push("/")
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #222;
  color: white;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 1rem;
}

.nav-link {
  margin-right: 1rem;
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

.logout-btn {
  background: transparent;
  border: 1px solid white;
  padding: 0.3rem 0.6rem;
  color: white;
  cursor: pointer;
}
</style>
