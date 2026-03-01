<template>
  <section class="home">

    <header class="header" style="padding: 2rem; text-align: center;">
      <h1>Nuestra Carta</h1>
      <p>Todos nuestros productos</p>
    </header>

    <div class="filters" style="padding: 1rem 2rem;">
      <label>Tipo: </label>
      <select v-model="selectedTipo" style="margin-left: 8px; padding: 4px 8px;">
        <option value="platos">Platos principales</option>
        <option value="bebidas">Bebidas</option>
        <option value="postres">Postres</option>
      </select>
    </div>

    <div v-if="selectedTipo === 'platos'" class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; padding: 1rem 2rem;">
      <article v-for="p in platosStore.platos" :key="p.id" style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
        <h3>{{ p.nombre }}</h3>
        <p style="color: #42b883; font-weight: bold;">{{ p.precio.toFixed(2) }} €</p>
        <p style="color: #666; font-size: 0.9rem;">{{ p.ingredientes }}</p>
      </article>
    </div>

    <div v-if="selectedTipo === 'bebidas'" class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; padding: 1rem 2rem;">
      <article v-for="b in bebidasStore.bebidas" :key="b.id" style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
        <h3>{{ b.nombre }}</h3>
        <p style="color: #42b883; font-weight: bold;">{{ b.precio.toFixed(2) }} €</p>
        <p style="color: #666; font-size: 0.9rem;">{{ b.esAlcoholica ? "Alcohólica" : "Sin alcohol" }}</p>
      </article>
    </div>

    <div v-if="selectedTipo === 'postres'" class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; padding: 1rem 2rem;">
      <article v-for="p in postresStore.postres" :key="p.id" style="border: 1px solid #ddd; border-radius: 8px; padding: 1rem;">
        <h3>{{ p.nombre }}</h3>
        <p style="color: #42b883; font-weight: bold;">{{ p.precio.toFixed(2) }} €</p>
        <p style="color: #666; font-size: 0.9rem;">{{ p.calorias }} kcal</p>
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