  <script setup lang="ts">
  import { ref } from "vue"
  import type { Category } from "../../types/category"
  
  const items = ref<Category[]>([
    { id: 1, name: "Frutas" },
    { id: 2, name: "Verduras" },
  ])
  
  const remove = (id: number) => {
    items.value = items.value.filter((i) => i.id !== id)
  }
  </script>
  
  <template>
    <section>
      <h2>Listado de Categorías</h2>
  
      <RouterLink to="/admin/categories/new">Crear nuevo</RouterLink>
  
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
          <RouterLink :to="`/admin/categories/${item.id}`">Editar</RouterLink>
          <button @click="remove(item.id)">Eliminar</button>
        </li>
      </ul>
    </section>
  </template>
  

  