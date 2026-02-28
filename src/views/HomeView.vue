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
import { useProductsStore } from "../stores/products.store"
import { useCategoriesStore } from "../stores/categories.store"

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

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.header {
  text-align: center;
  padding: 2rem 1rem;
  background: #42b883;
  color: white;
  border-radius: 8px;
  margin-bottom: 2rem;
}

/* Filtros */
.filters {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Grid de productos */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.price {
  font-weight: bold;
  color: #42b883;
}

.desc {
  font-size: 0.9rem;
  color: #555;
}
</style>
