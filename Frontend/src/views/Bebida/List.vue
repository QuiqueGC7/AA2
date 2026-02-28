<template>
  <v-container>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h4">Bebidas</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" prepend-icon="mdi-plus" to="/admin/bebidas/new">
          Nueva bebida
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <v-data-table
      :headers="headers"
      :items="bebidas"
      :loading="loading"
      class="elevation-1"
    >
      <template #item.precio="{ item }">
        {{ item.precio.toFixed(2) }} €
      </template>

      <template #item.esAlcoholica="{ item }">
        <v-chip :color="item.esAlcoholica ? 'orange' : 'green'" size="small">
          {{ item.esAlcoholica ? "Sí" : "No" }}
        </v-chip>
      </template>

      <template #item.actions="{ item }">
        <v-btn icon="mdi-pencil" size="small" variant="text" :to="`/admin/bebidas/${item.id}`" />
        <v-btn icon="mdi-delete" size="small" variant="text" color="error" @click="confirmDelete(item)" />
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Eliminar bebida</v-card-title>
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
import { fetchBebidas, deleteBebida } from "../../services/Bebida.service"
import type { Bebida } from "../../types/Bebida"

const bebidas  = ref<Bebida[]>([])
const loading  = ref(false)
const error    = ref("")
const dialog   = ref(false)
const deleting = ref(false)
const selected = ref<Bebida | null>(null)

const headers = [
  { title: "ID",           key: "id" },
  { title: "Nombre",       key: "nombre" },
  { title: "Precio",       key: "precio" },
  { title: "Alcohólica",   key: "esAlcoholica" },
  { title: "Acciones",     key: "actions", sortable: false },
]

async function load() {
  loading.value = true
  try {
    bebidas.value = await fetchBebidas()
  } catch {
    error.value = "Error al cargar las bebidas"
  } finally {
    loading.value = false
  }
}

function confirmDelete(item: Bebida) {
  selected.value = item
  dialog.value   = true
}

async function handleDelete() {
  if (!selected.value) return
  deleting.value = true
  try {
    await deleteBebida(selected.value.id)
    await load()
    dialog.value = false
  } catch {
    error.value = "Error al eliminar la bebida"
  } finally {
    deleting.value = false
  }
}

onMounted(load)
</script>