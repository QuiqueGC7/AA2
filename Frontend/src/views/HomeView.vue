<template>
  <section class="home">

    <!-- Header -->
    <header class="header">
      <h1>Bienvenido a MiTienda</h1>
      <p>Encuentra los mejores productos al mejor precio</p>
    </header>

    <!-- Filtros -->
    <div class="filters">
      <label>Categoría:</label>
      <select v-model="selectedCategory">
        <option value="">Todas</option>
        <option v-for="c in categories.items" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>
    </div>

    <!-- Productos -->
    <div class="products-grid">
      <article
        v-for="p in filteredProducts"
        :key="p.id"
        class="product-card"
      >
        <h3>{{ p.name }}</h3>
        <p class="price">{{ p.price }} €</p>
        <p class="desc">{{ p.description }}</p>
      </article>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useProductsStore } from "../stores/PlatoPrincipal.store"
import { useCategoriesStore } from "../stores/Bebida.store"

const products = useProductsStore()
const categories = useCategoriesStore()

const selectedCategory = ref<number | ''>('')

onMounted(async () => {
  await categories.loadAll()
  await products.loadAll()
})

const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.items
  return products.items.filter(p => p.categoryId === Number(selectedCategory.value))
})
</script>

