<template>
  <v-card rounded="lg" elevation="2" class="h-100">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ plato.nombre }}
    </v-card-title>

    <v-card-text>
      <div class="text-h6 text-primary mb-1">{{ plato.precio.toFixed(2) }} €</div>
      <div class="text-body-2 text-medium-emphasis">{{ plato.ingredientes }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        :to="`/admin/platos/${plato.id}`"
      />
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="$emit('delete', plato)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { PlatoPrincipal } from "../../types/PlatoPrincipal"

defineProps<{ plato: PlatoPrincipal }>()
defineEmits<{ delete: [plato: PlatoPrincipal] }>()
</script>