<template>
    <section>
      <h2>Listado de Entidad A</h2>
  
      <RouterLink to="/entity-a/new">Crear nuevo</RouterLink>
  
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
          <RouterLink :to="`/entity-a/${item.id}`">Editar</RouterLink>
          <button @click="remove(item.id)">Eliminar</button>
        </li>
      </ul>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue"
  import type { Product } from "../../types/product"
  const items = ref<Product[]>([
    { id: 1, name: "Platano", price: 0.89, categoryId: 1, stock: 20, description: "Platanos de canarias" },
    { id: 2, name: "Borrajas", price: 3.49, categoryId: 2, stock: 200, description: "Borrajas frescas" },
  ])
  
  const remove = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id)
  }
  </script>
  