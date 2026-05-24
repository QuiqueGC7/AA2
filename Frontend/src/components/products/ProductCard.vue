<template>
  <article class="product-card">
    <h3>{{ item.nombre }}</h3>
    <p class="price">{{ item.precio.toFixed(2) }} €</p>
    <slot />
  </article>
</template>

<script setup lang="ts">
defineProps<{ item: { nombre: string; precio: number } }>()
</script>

<style scoped>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: var(--v-theme-surface, #fff);
}
.price {
  color: var(--v-theme-primary, #42b883);
  font-weight: bold;
}
</style>