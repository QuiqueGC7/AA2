<template>
  <v-container>
    <v-row class="mb-4" align="center">
      <v-col>
        <h1 class="text-h4">Platos Principales</h1>
      </v-col>
      <v-col class="text-right">
        <v-btn color="primary" prepend-icon="mdi-plus" to="/admin/platos/new">
          Nuevo plato
        </v-btn>
      </v-col>
    </v-row>

    <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>

    <!-- Grid de cards — el v-for está aquí, el pintado en PlatoCard -->
    <v-row v-if="!store.loading">
      <v-col
        v-for="plato in store.platos"
        :key="plato.id"
        cols="12" sm="6" md="4" lg="3"
      >
        <PlatoCard :plato="plato" @delete="confirmDelete" />
      </v-col>
      <v-col v-if="store.platos.length === 0" cols="12">
        <v-alert type="info" variant="tonal">No hay platos registrados todavía.</v-alert>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col v-for="n in 4" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card" />
      </v-col>
    </v-row>

    <!-- Diálogo confirmación borrado -->
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>Eliminar plato</v-card-title>
        <v-card-text>
          ¿Seguro que quieres eliminar <strong>{{ selected?.nombre }}</strong>?
        </v-card-text>
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
import { usePlatoPrincipalStore } from "../../stores/PlatoPrincipal.store"
import type { PlatoPrincipal } from "../../types/PlatoPrincipal"
import PlatoCard from "../../components/platos/PlatoCard.vue"

const store    = usePlatoPrincipalStore()
const dialog   = ref(false)
const deleting = ref(false)
const selected = ref<PlatoPrincipal | null>(null)

onMounted(() => store.fetchAll())

function confirmDelete(item: PlatoPrincipal) {
  selected.value = item
  dialog.value   = true
}

async function handleDelete() {
  if (!selected.value) return
  deleting.value = true
  try {
    await store.remove(selected.value.id)
    dialog.value = false
  } finally {
    deleting.value = false
  }
}
</script>