<template>
  <v-container max-width="600">
    <h1 class="text-h4 mb-6">{{ isEdit ? "Editar postre" : "Nuevo postre" }}</h1>

    <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>

    <form @submit.prevent="handleSubmit">
      <v-text-field
        v-model="nombre"
        label="Nombre"
        :error-messages="errores.nombre"
        variant="outlined"
        class="mb-3"
      />

      <v-text-field
        v-model="precio"
        label="Precio (€)"
        type="number"
        step="0.01"
        min="0"
        :error-messages="errores.precio"
        variant="outlined"
        class="mb-3"
      />

      <v-text-field
        v-model="calorias"
        label="Calorías"
        type="number"
        min="0"
        :error-messages="errores.calorias"
        variant="outlined"
        class="mb-3"
      />

      <div class="d-flex gap-3">
        <v-btn type="submit" color="primary" :loading="saving">
          {{ isEdit ? "Guardar cambios" : "Crear postre" }}
        </v-btn>
        <v-btn variant="text" to="/admin/postres">Cancelar</v-btn>
      </div>
    </form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useForm, useField } from "vee-validate"
import { fetchPostres, createPostre, updatePostre } from "../../services/Postre.service"

const route  = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const error  = ref("")
const saving = ref(false)

const { handleSubmit: submit, errors: errores } = useForm({
  validationSchema: {
    nombre:   (v: string) => (v && v.trim().length >= 2) || "El nombre debe tener al menos 2 caracteres",
    precio:   (v: number) => (v !== undefined && v > 0)  || "El precio debe ser mayor que 0",
    calorias: (v: number) => (v !== undefined && v >= 0) || "Las calorías no pueden ser negativas",
  },
})

const { value: nombre }   = useField<string>("nombre")
const { value: precio }   = useField<number>("precio")
const { value: calorias } = useField<number>("calorias")

onMounted(async () => {
  if (isEdit.value) {
    try {
      const all   = await fetchPostres()
      const found = all.find((p) => p.id === Number(route.params.id))
      if (found) {
        nombre.value   = found.nombre
        precio.value   = found.precio
        calorias.value = found.calorias
      }
    } catch {
      error.value = "Error al cargar el postre"
    }
  }
})

const handleSubmit = submit(async (values) => {
  saving.value = true
  error.value  = ""
  try {
    if (isEdit.value) {
      await updatePostre(Number(route.params.id), values as any)
    } else {
      await createPostre(values as any)
    }
    router.push("/admin/postres")
  } catch {
    error.value = "Error al guardar. Revisa los datos e inténtalo de nuevo."
  } finally {
    saving.value = false
  }
})
</script>