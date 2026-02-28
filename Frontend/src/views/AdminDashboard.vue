<template>
  <section class="dashboard">

    <h1>Panel de administración</h1>

    <!-- Métricas principales -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Productos</h3>
        <p class="number">{{ products.items.length }}</p>
      </div>

      <div class="stat-card">
        <h3>Categorías</h3>
        <p class="number">{{ categories.items.length }}</p>
      </div>

      <div class="stat-card">
        <h3>Stock total</h3>
        <p class="number">{{ totalStock }}</p>
      </div>
    </div>

    <!-- Gráfica simple -->
    <div class="chart-card">
      <h3>Stock por categoría</h3>

      <div class="chart">
        <div
          v-for="c in categories.items"
          :key="c.id"
          class="bar"
          :style="{ height: barHeight(c.id) + 'px' }"
        >
          <span>{{ c.name }}</span>
        </div>
      </div>
    </div>

    <!-- Últimos productos -->
    <div class="latest-card">
      <h3>Últimos productos añadidos</h3>

      <ul>
        <li v-for="p in latestProducts" :key="p.id">
          <strong>{{ p.name }}</strong> — {{ p.price }} €
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useProductsStore } from "../stores/products.store"
import { useCategoriesStore } from "../stores/categories.store"

const products = useProductsStore()
const categories = useCategoriesStore()

onMounted(async () => {
  await categories.loadAll()
  await products.loadAll()
})

const totalStock = computed(() =>
  products.items.reduce((sum, p) => sum + p.stock, 0)
)

const latestProducts = computed(() =>
  [...products.items].slice(-5).reverse()
)

const barHeight = (categoryId: number) => {
  const total = products.items
    .filter(p => p.categoryId === categoryId)
    .reduce((sum, p) => sum + p.stock, 0)

  return total * 5 // escala visual
}
</script>
