<template>
  <v-app>
    <v-main class="auth-main">
      <slot />
    </v-main>
  </v-app>
</template>

<style scoped>
.auth-main {
  background: linear-gradient(135deg, #e8f5e9 0%, #f0f4f8 100%);
  min-height: 100vh;
}
</style>