<template>
  <section class="dashboard">

    <h1>Panel de administración</h1>

    <!-- Métricas principales -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Platos principales</h3>
        <p class="number">{{ platosStore.total }}</p>
      </div>

      <div class="stat-card">
        <h3>Bebidas</h3>
        <p class="number">{{ bebidasStore.total }}</p>
      </div>

      <div class="stat-card">
        <h3>Postres</h3>
        <p class="number">{{ postresStore.total }}</p>
      </div>

      <div class="stat-card">
        <h3>Total carta</h3>
        <p class="number">{{ totalCarta }}</p>
      </div>
    </div>

    <!-- Gráfica simple: precio medio por sección -->
    <div class="chart-card">
      <h3>Precio medio por sección</h3>
      <div class="chart">
        <div class="bar" :style="{ height: barHeightPlatos + 'px' }">
          <span>Platos ({{ precioMedioPlatos }} €)</span>
        </div>
        <div class="bar" :style="{ height: barHeightBebidas + 'px' }">
          <span>Bebidas ({{ precioMedioBebidas }} €)</span>
        </div>
        <div class="bar" :style="{ height: barHeightPostres + 'px' }">
          <span>Postres ({{ precioMedioPostres }} €)</span>
        </div>
      </div>
    </div>

    <!-- Últimos platos añadidos -->
    <div class="latest-card">
      <h3>Últimos platos añadidos</h3>
      <ul>
        <li v-for="p in ultimosPlatos" :key="p.id">
          <strong>{{ p.nombre }}</strong> — {{ p.precio.toFixed(2) }} €
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { usePlatoPrincipalStore } from "../stores/PlatoPrincipal.store"
import { useBebidaStore }          from "../stores/Bebida.store"
import { usePostreStore }          from "../stores/Postre.store"

const platosStore  = usePlatoPrincipalStore()
const bebidasStore = useBebidaStore()
const postresStore = usePostreStore()

onMounted(async () => {
  await platosStore.fetchAll()
  await bebidasStore.fetchAll()
  await postresStore.fetchAll()
})

const totalCarta = computed(() =>
  platosStore.total + bebidasStore.total + postresStore.total
)

const ultimosPlatos = computed(() =>
  [...platosStore.platos].slice(-5).reverse()
)

// Precio medio de cada sección
const precioMedioPlatos = computed(() => {
  if (!platosStore.platos.length) return 0
  const media = platosStore.platos.reduce((s, p) => s + p.precio, 0) / platosStore.platos.length
  return media.toFixed(2)
})

const precioMedioBebidas = computed(() => {
  if (!bebidasStore.bebidas.length) return 0
  const media = bebidasStore.bebidas.reduce((s, b) => s + b.precio, 0) / bebidasStore.bebidas.length
  return media.toFixed(2)
})

const precioMedioPostres = computed(() => {
  if (!postresStore.postres.length) return 0
  const media = postresStore.postres.reduce((s, p) => s + p.precio, 0) / postresStore.postres.length
  return media.toFixed(2)
})

// Alturas para la gráfica (escala x20)
const barHeightPlatos  = computed(() => Number(precioMedioPlatos.value)  * 20)
const barHeightBebidas = computed(() => Number(precioMedioBebidas.value) * 20)
const barHeightPostres = computed(() => Number(precioMedioPostres.value) * 20)
</script>