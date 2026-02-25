  <script setup lang="ts">
  import { ref } from "vue"
  import type { A } from "@/types/A"
  
  const items = ref<A[]>([
    { id: 1, name: "Elemento A1" },
    { id: 2, name: "Elemento A2" },
  ])
  
  const remove = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id)
  }
  </script>
  
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
  

  