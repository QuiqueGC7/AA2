<template>
  <v-card rounded="lg" elevation="2" class="h-100">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ postre.nombre }}
    </v-card-title>

    <v-card-text>
      <div class="text-h6 text-primary mb-1">{{ postre.precio.toFixed(2) }} €</div>
      <div class="text-body-2 text-medium-emphasis">
        <v-icon size="small" class="mr-1">mdi-fire</v-icon>
        {{ postre.calorias }} kcal
      </div>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        :to="`/admin/postres/${postre.id}`"
      />
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="$emit('delete', postre)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Postre } from "../../types/Postre"

defineProps<{ postre: Postre }>()
defineEmits<{ delete: [postre: Postre] }>()
</script>