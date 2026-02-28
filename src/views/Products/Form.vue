<script setup lang="ts">
  import { Form, Field, ErrorMessage } from "vee-validate"
  import * as Yup from "yup"
  import { ref, onMounted } from "vue"
  import { useRoute, useRouter } from "vue-router"
  import { useProductsStore } from "../../stores/products.store"
  import { useCategoriesStore } from "../../stores/categories.store"
  import type { Product } from "../../types/product"

  const route = useRoute()
  const router = useRouter()
  const products = useProductsStore()
  const categories = useCategoriesStore()

  const schema = Yup.object({
    name: Yup.string().required(),
    price: Yup.number().required().min(0),
    categoryId: Yup.number().required(),
    stock: Yup.number().required().min(0),
    description: Yup.string().required(),
  })

  const form = ref<Product>({
    id: 0,
    name: "",
    price: 0,
    categoryId: 0,
    stock: 0,
    description: "",
  })

  onMounted(async () => {
    await categories.loadAll()
    if (route.params.id) {
      const id = Number(route.params.id)
      const existing = products.items.find((p) => p.id === id)
      if (existing) form.value = { ...existing }
    }
  })

  const save = async (values: Product) => {
  if (values.id) {
    await products.update(values.id, values)
  } else {
    await products.create(values)
  }
  router.push("/admin/products")
}

  </script>

  <template>
    <Form <Product>
      :initial-values="form"
      :validation-schema="schema"
      @submit="save"
    >

    <div>
      <label>Nombre</label>
      <Field name="name" />
      <ErrorMessage name="name" />
    </div>

    <div>
      <label>Precio</label>
      <Field name="price" type="number" />
      <ErrorMessage name="price" />
    </div>

    <div>
      <label>Categoría</label>
      <Field as="select" name="categoryId">
        <option value="">Selecciona categoría</option>
        <option v-for="c in categories.items" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </Field>
      <ErrorMessage name="categoryId" />
    </div>

    <div>
      <label>Stock</label>
      <Field name="stock" type="number" />
      <ErrorMessage name="stock" />
    </div>

    <div>
      <label>Descripción</label>
      <Field name="description" />
      <ErrorMessage name="description" />
    </div>

    <button type="submit">Guardar</button>
  </Form>
</template>

