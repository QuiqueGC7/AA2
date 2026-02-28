<script setup lang="ts">
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import type { Category } from "../../types/category"
import type { VForm } from "vuetify/components"

const route  = useRoute()
const router = useRouter()

const isEditing = !!route.params.id
const loading   = ref(false)
const form      = ref<VForm | null>(null)

const fields = ref<Category>({
  id: 0,
  name: "",
})

if (route.params.id) {
  fields.value = { id: Number(route.params.id), name: "Elemento cargado" }
}

const rules = {
  required: (v: string) => !!v || "El nombre es obligatorio",
}

const save = async () => {
  const { valid } = await form.value!.validate()
  if (!valid) return

  loading.value = true
  try {
    console.log("Guardado:", fields.value)
    router.push("/admin/categories")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6" lg="5">

        <v-card rounded="lg" elevation="2" class="pa-2">
          <v-card-title class="text-h5 font-weight-bold pa-4 pb-0">
            {{ isEditing ? "Editar categoría" : "Nueva categoría" }}
          </v-card-title>

          <v-divider class="mt-4" />

          <v-card-text class="pa-6">
            <v-form ref="form" @submit.prevent="save">
              <v-text-field
                v-model="fields.name"
                label="Nombre"
                prepend-inner-icon="mdi-shape-outline"
                variant="outlined"
                :rules="[rules.required]"
              />
            </v-form>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn variant="text" to="/admin/categories">Cancelar</v-btn>
            <v-btn
              color="primary"
              variant="flat"
              :loading="loading"
              @click="save"
            >
              {{ isEditing ? "Actualizar" : "Crear categoría" }}
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>