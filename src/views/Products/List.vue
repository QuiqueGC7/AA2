<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import type { Product } from "../../types/product"

const router = useRouter()

const headers = [
  { title: "#",           key: "id",          width: "60px"  },
  { title: "Nombre",      key: "name"                        },
  { title: "Precio",      key: "price"                       },
  { title: "Stock",       key: "stock"                       },
  { title: "Descripción", key: "description"                 },
  { title: "Acciones",    key: "actions",     sortable: false },
]

const items = ref<Product[]>([
  { id: 1, name: "Platano",  price: 0.89, categoryId: 1, stock: 20,  description: "Platanos de canarias" },
  { id: 2, name: "Borrajas", price: 3.49, categoryId: 2, stock: 200, description: "Borrajas frescas"     },
])

const deleteDialog = ref(false)
const selectedId   = ref<number | null>(null)

const confirmDelete = (id: number) => {
  selectedId.value  = id
  deleteDialog.value = true
}

const remove = () => {
  if (selectedId.value !== null) {
    items.value = items.value.filter((i) => i.id !== selectedId.value)
  }
  deleteDialog.value = false
  selectedId.value  = null
}
</script>

<template>
  <v-container>

    <!-- Cabecera -->
    <v-row align="center" class="mb-4">
      <v-col>
        <h2 class="text-h5 font-weight-bold">Productos</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" prepend-icon="mdi-plus" to="/admin/products/new">
          Nuevo producto
        </v-btn>
      </v-col>
    </v-row>

    <!-- Tabla -->
    <v-card rounded="lg" elevation="2">
      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="10"
        hover
      >
        <!-- Precio -->
        <template #item.price="{ item }">
          <span class="text-primary font-weight-bold">{{ item.price }} €</span>
        </template>

        <!-- Descripción truncada -->
        <template #item.description="{ item }">
          <span class="text-medium-emphasis text-body-2">
            {{ item.description }}
          </span>
        </template>

        <!-- Acciones -->
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="info"
            :to="`/admin/products/${item.id}`"
          />
          <v-btn
            icon="mdi-delete"
            size="small"
            variant="text"
            color="error"
            @click="confirmDelete(item.id)"
          />
        </template>

        <!-- Sin datos -->
        <template #no-data>
          <v-empty-state
            icon="mdi-package-variant-closed"
            title="Sin productos"
            text="Crea el primero pulsando el botón superior."
          />
        </template>
      </v-data-table>
    </v-card>

    <!-- Diálogo confirmación borrado -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">¿Eliminar producto?</v-card-title>
        <v-card-text>Esta acción no se puede deshacer.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="deleteDialog = false">Cancelar</v-btn>
          <v-btn color="error" variant="flat" @click="remove">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>