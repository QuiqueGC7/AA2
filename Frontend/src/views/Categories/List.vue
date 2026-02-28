<script setup lang="ts">
import { ref } from "vue"
import type { Category } from "../../types/category"

const headers = [
  { title: "#",        key: "id",      width: "80px"  },
  { title: "Nombre",   key: "name"                    },
  { title: "Acciones", key: "actions", sortable: false },
]

const items = ref<Category[]>([
  { id: 1, name: "Frutas"    },
  { id: 2, name: "Verduras"  },
])

const deleteDialog = ref(false)
const selectedId   = ref<number | null>(null)

const confirmDelete = (id: number) => {
  selectedId.value   = id
  deleteDialog.value = true
}

const remove = () => {
  if (selectedId.value !== null) {
    items.value = items.value.filter((i) => i.id !== selectedId.value)
  }
  deleteDialog.value = false
  selectedId.value   = null
}
</script>

<template>
  <v-container>

    <!-- Cabecera -->
    <v-row align="center" class="mb-4">
      <v-col>
        <h2 class="text-h5 font-weight-bold">Categorías</h2>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" prepend-icon="mdi-plus" to="/admin/categories/new">
          Nueva categoría
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
        <!-- Acciones -->
        <template #item.actions="{ item }">
          <v-btn
            icon="mdi-pencil"
            size="small"
            variant="text"
            color="info"
            :to="`/admin/categories/${item.id}`"
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
            icon="mdi-shape-outline"
            title="Sin categorías"
            text="Crea la primera pulsando el botón superior."
          />
        </template>
      </v-data-table>
    </v-card>

    <!-- Diálogo confirmación borrado -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">¿Eliminar categoría?</v-card-title>
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
  