<template>
  <section class="home">

    <!-- Header -->
    <header class="header">
      <h1>Bienvenido al Restaurante</h1>
      <p>Consulta nuestra carta completa</p>
    </header>

    <!-- Filtro por tipo -->
    <div class="filters">
      <label>Tipo:</label>
      <select v-model="selectedTipo">
        <option value="platos">Platos principales</option>
        <option value="bebidas">Bebidas</option>
        <option value="postres">Postres</option>
      </select>
    </div>

    <!-- Platos -->
    <div v-if="selectedTipo === 'platos'" class="products-grid">
      <article v-for="p in platosStore.platos" :key="p.id" class="product-card">
        <h3>{{ p.nombre }}</h3>
        <p class="price">{{ p.precio.toFixed(2) }} €</p>
        <p class="desc">{{ p.ingredientes }}</p>
      </article>
    </div>

    <!-- Bebidas -->
    <div v-if="selectedTipo === 'bebidas'" class="products-grid">
      <article v-for="b in bebidasStore.bebidas" :key="b.id" class="product-card">
        <h3>{{ b.nombre }}</h3>
        <p class="price">{{ b.precio.toFixed(2) }} €</p>
        <p class="desc">{{ b.esAlcoholica ? "Bebida alcohólica" : "Sin alcohol" }}</p>
      </article>
    </div>

    <!-- Postres -->
    <div v-if="selectedTipo === 'postres'" class="products-grid">
      <article v-for="p in postresStore.postres" :key="p.id" class="product-card">
        <h3>{{ p.nombre }}</h3>
        <p class="price">{{ p.precio.toFixed(2) }} €</p>
        <p class="desc">{{ p.calorias }} kcal</p>
      </article>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { usePlatoPrincipalStore } from "../stores/PlatoPrincipal.store"
import { useBebidaStore }          from "../stores/Bebida.store"
import { usePostreStore }          from "../stores/Postre.store"

const platosStore  = usePlatoPrincipalStore()
const bebidasStore = useBebidaStore()
const postresStore = usePostreStore()

const selectedTipo = ref<"platos" | "bebidas" | "postres">("platos")

onMounted(async () => {
  await platosStore.fetchAll()
  await bebidasStore.fetchAll()
  await postresStore.fetchAll()
})
</script>