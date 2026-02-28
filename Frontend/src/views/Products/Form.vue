<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useProductsStore } from "../../stores/products.store"
import { useCategoriesStore } from "../../stores/categories.store"
import type { Product } from "../../types/product"
import type { VForm } from "vuetify/components"

const route      = useRoute()
const router     = useRouter()
const products   = useProductsStore()
const categories = useCategoriesStore()

const isEditing = !!route.params.id
const loading   = ref(false)
const form      = ref<VForm | null>(null)  // referencia al v-form para validar

const fields = ref<Product>({
  id: 0, name: "", price: 0, categoryId: 0, stock: 0, description: "",
})

const rules = {
  required:    (v: string | number) => !!v || "Campo obligatorio",
  positiveNum: (v: number) => v >= 0 || "Debe ser 0 o mayor",
  category:    (v: number) => v > 0  || "Selecciona una categoría",
}

onMounted(async () => {
  await categories.loadAll()
  if (route.params.id) {
    const id       = Number(route.params.id)
    const existing = products.items.find((p) => p.id === id)
    if (existing) fields.value = { ...existing }
  }
})

const save = async () => {
  const { valid } = await form.value!.validate()
  if (!valid) return

  loading.value = true
  try {
    if (fields.value.id) {
      await products.update(fields.value.id, fields.value)
    } else {
      await products.create(fields.value)
    }
    router.push("/admin/products")
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="7">

        <v-card rounded="lg" elevation="2" class="pa-2">
          <v-card-title class="text-h5 font-weight-bold pa-4 pb-0">
            {{ isEditing ? "Editar producto" : "Nuevo producto" }}
          </v-card-title>

          <v-divider class="mt-4" />

          <v-card-text class="pa-6">
            <v-form ref="form" @submit.prevent="save">
              <v-row>

                <!-- Nombre -->
                <v-col cols="12">
                  <v-text-field
                    v-model="fields.name"
                    label="Nombre"
                    prepend-inner-icon="mdi-tag-outline"
                    variant="outlined"
                    :rules="[rules.required]"
                  />
                </v-col>

                <!-- Precio / Stock -->
                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="fields.price"
                    label="Precio (€)"
                    type="number"
                    prepend-inner-icon="mdi-currency-eur"
                    variant="outlined"
                    :rules="[rules.required, rules.positiveNum]"
                  />
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    v-model.number="fields.stock"
                    label="Stock"
                    type="number"
                    prepend-inner-icon="mdi-package-variant"
                    variant="outlined"
                    :rules="[rules.required, rules.positiveNum]"
                  />
                </v-col>

                <!-- Categoría -->
                <v-col cols="12">
                  <v-select
                    v-model="fields.categoryId"
                    :items="categories.items"
                    item-title="name"
                    item-value="id"
                    label="Categoría"
                    prepend-inner-icon="mdi-shape-outline"
                    variant="outlined"
                    :rules="[rules.category]"
                  />
                </v-col>

                <!-- Descripción -->
                <v-col cols="12">
                  <v-textarea
                    v-model="fields.description"
                    label="Descripción"
                    prepend-inner-icon="mdi-text"
                    variant="outlined"
                    rows="3"
                    auto-grow
                    :rules="[rules.required]"
                  />
                </v-col>

              </v-row>
            </v-form>
          </v-card-text>

          <v-divider />

          <v-card-actions class="pa-4">
            <v-spacer />
            <v-btn variant="text" to="/admin/products">Cancelar</v-btn>
            <v-btn
              color="primary"
              variant="flat"
              :loading="loading"
              @click="save"
            >
              {{ isEditing ? "Actualizar" : "Crear producto" }}
            </v-btn>
          </v-card-actions>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>