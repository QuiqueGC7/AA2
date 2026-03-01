<template>
  <v-card rounded="lg" elevation="2" class="h-100">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ bebida.nombre }}
    </v-card-title>

    <v-card-text>
      <div class="text-h6 text-primary mb-1">{{ bebida.precio.toFixed(2) }} €</div>
      <v-chip
        :color="bebida.esAlcoholica ? 'orange' : 'green'"
        size="small"
        class="mt-1"
      >
        {{ bebida.esAlcoholica ? "Alcohólica" : "Sin alcohol" }}
      </v-chip>
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn
        icon="mdi-pencil"
        size="small"
        variant="text"
        :to="`/admin/bebidas/${bebida.id}`"
      />
      <v-btn
        icon="mdi-delete"
        size="small"
        variant="text"
        color="error"
        @click="$emit('delete', bebida)"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Bebida } from "../../types/Bebida"

defineProps<{ bebida: Bebida }>()
defineEmits<{ delete: [bebida: Bebida] }>()
</script>