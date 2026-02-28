<template>
  <v-snackbar
    v-model="visible"
    color="success"
    location="top right"
    :timeout="3000"
    rounded="lg"
    elevation="4"
  >
    <v-icon class="mr-2">mdi-check-circle-outline</v-icon>
    {{ ui.notification }}

    <template #actions>
      <v-btn icon="mdi-close" variant="text" @click="ui.clearNotification" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUIStore } from "../../stores/ui.store"

const ui = useUIStore()

const visible = computed({
  get: () => !!ui.notification,
  set: (v) => { if (!v) ui.clearNotification() },
})
</script>