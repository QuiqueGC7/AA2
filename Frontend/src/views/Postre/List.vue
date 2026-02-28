<template>
  <v-container>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h4">Postres</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" prepend-icon="mdi-plus" to="/admin/postres/new">
          Nuevo postre
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <v-data-table
      :headers="headers"
      :items="postres"
      :loading="loading"
      class="elevation-1"
    >
      <template #item.precio="{ item }">
        {{ item.precio.toFixed(2) }} €
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil" size="small" variant="text" :to="`/admin/postres/${item.id}`" />
        <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="confirmDelete(item)" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Eliminar postre</v-card-title>
        <v-card-text>¿Seguro que quieres eliminar <strong>{{ selected?.nombre }}</strong>?</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="error" :loading="deleting" @click="handleDelete">Eliminar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { fetchPostres, deletePostre } from "../../services/Postre.service"
import type { Postre } from "../../types/Postre"

const postres  = ref<Postre[]>([])
const loading  = ref(false)
const error    = ref("")
const dialog   = ref(false)
const deleting = ref(false)
const selected = ref<Postre | null>(null)

const headers = [
  { title: "ID",       key: "id" },
  { title: "Nombre",   key: "nombre" },
  { title: "Precio",   key: "precio" },
  { title: "Calorías", key: "calorias" },
  { title: "Acciones", key: "actions", sortable: false },
]

async function load() {
  loading.value = true
  try {
    postres.value = await fetchPostres()
  } catch {
    error.value = "Error al cargar los postres"
  } finally {
    loading.value = false
  }
}

function confirmDelete(item: Postre) {
  selected.value = item
  dialog.value   = true
}

async function handleDelete() {
  if (!selected.value) return
  deleting.value = true
  try {
    await deletePostre(selected.value.id)
    await load()
    dialog.value = false
  } catch {
    error.value = "Error al eliminar el postre"
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>