<template>
  <v-container>

    <h1 class="text-h4 mb-6">{{ t("search.title") }}</h1>

    <!-- ── Filtros ── -->
    <v-card class="mb-6 pa-4" elevation="1">
      <v-row dense align="center">

        <!-- Búsqueda por nombre -->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="q"
            :label="t('search.placeholder')"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            density="compact"
            clearable
            hide-details
            @update:modelValue="resetPage"
          />
        </v-col>

        <!-- Categoría -->
        <v-col cols="6" md="2">
          <v-select
            v-model="category"
            :items="categoryOptions"
            item-title="label"
            item-value="value"
            :label="t('search.category')"
            variant="outlined"
            density="compact"
            hide-details
            @update:modelValue="resetPage"
          />
        </v-col>

        <!-- Ordenar -->
        <v-col cols="6" md="2">
          <v-select
            v-model="sortBy"
            :items="sortOptions"
            item-title="label"
            item-value="value"
            :label="t('search.sortBy')"
            variant="outlined"
            density="compact"
            hide-details
          />
        </v-col>

        <!-- Fecha desde -->
        <v-col cols="6" md="2">
          <v-text-field
            v-model="dateFrom"
            :label="t('search.dateFrom')"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            @update:modelValue="resetPage"
          />
        </v-col>

        <!-- Fecha hasta -->
        <v-col cols="6" md="2">
          <v-text-field
            v-model="dateTo"
            :label="t('search.dateTo')"
            type="date"
            variant="outlined"
            density="compact"
            hide-details
            clearable
            @update:modelValue="resetPage"
          />
        </v-col>

      </v-row>

      <v-row dense class="mt-2">
        <v-col>
          <v-btn size="small" variant="text" prepend-icon="mdi-refresh" @click="resetAll">
            {{ t("search.resetFilters") }}
          </v-btn>
          <span class="text-caption text-medium-emphasis ml-3">
            {{ filtered.length }} {{ t("search.results") }}
          </span>
        </v-col>
      </v-row>
    </v-card>

    <!-- ── Tabla de resultados ── -->
    <v-card elevation="1">
      <v-data-table
        :headers="headers"
        :items="paginated"
        :loading="loading"
        hide-default-footer
        item-value="key"
      >
        <!-- Chip de categoría -->
        <template #item.category="{ item }">
          <v-chip :color="categoryColor(item.category)" size="small" label>
            {{ t(`admin.${item.category}`) }}
          </v-chip>
        </template>

        <!-- Precio formateado -->
        <template #item.precio="{ item }">
          {{ item.precio.toFixed(2) }} €
        </template>

        <!-- Acciones -->
        <template #item.actions="{ item }">
          <v-btn
            size="small"
            variant="text"
            prepend-icon="mdi-eye"
            @click="openDetail(item)"
          >
            {{ t("search.detail") }}
          </v-btn>
        </template>

        <!-- Sin resultados -->
        <template #no-data>
          <v-alert type="info" variant="tonal" class="ma-4">
            {{ t("search.noResults") }}
          </v-alert>
        </template>
      </v-data-table>
    </v-card>

    <!-- ── Paginación ── -->
    <div class="d-flex justify-center align-center gap-4 mt-4">
      <v-btn
        :disabled="page <= 1"
        variant="outlined"
        size="small"
        prepend-icon="mdi-chevron-left"
        @click="page--"
      >
        {{ t("search.previous") }}
      </v-btn>

      <span class="text-body-2">
        {{ t("search.page") }} {{ page }} {{ t("search.of") }} {{ totalPages }}
      </span>

      <v-btn
        :disabled="page >= totalPages"
        variant="outlined"
        size="small"
        append-icon="mdi-chevron-right"
        @click="page++"
      >
        {{ t("search.next") }}
      </v-btn>
    </div>

    <!-- ── Modal de detalle ── -->
    <v-dialog v-model="detailDialog" max-width="480">
      <v-card v-if="selected" rounded="lg">
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          {{ selected.nombre }}
          <v-chip :color="categoryColor(selected.category)" size="small" label>
            {{ t(`admin.${selected.category}`) }}
          </v-chip>
        </v-card-title>

        <v-divider />

        <v-card-text class="pt-4">
          <v-list density="compact">
            <v-list-item>
              <template #prepend><v-icon>mdi-currency-eur</v-icon></template>
              <v-list-item-title>{{ t("common.price") }}</v-list-item-title>
              <v-list-item-subtitle>{{ selected.precio.toFixed(2) }} €</v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selected.category === 'platos'">
              <template #prepend><v-icon>mdi-food-variant</v-icon></template>
              <v-list-item-title>{{ t("products.ingredients") }}</v-list-item-title>
              <v-list-item-subtitle>{{ (selected as any).ingredientes }}</v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selected.category === 'bebidas'">
              <template #prepend><v-icon>mdi-cup</v-icon></template>
              <v-list-item-title>{{ t("products.alcoholic") }}</v-list-item-title>
              <v-list-item-subtitle>
                {{ (selected as any).esAlcoholica ? t("products.alcoholic") : t("products.nonAlcoholic") }}
              </v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selected.category === 'postres'">
              <template #prepend><v-icon>mdi-fire</v-icon></template>
              <v-list-item-title>{{ t("products.calories") }}</v-list-item-title>
              <v-list-item-subtitle>{{ (selected as any).calorias }} kcal</v-list-item-subtitle>
            </v-list-item>

            <v-list-item v-if="selected.addedDate">
              <template #prepend><v-icon>mdi-calendar</v-icon></template>
              <v-list-item-title>{{ t("products.addedDate") }}</v-list-item-title>
              <v-list-item-subtitle>{{ selected.addedDate }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="detailDialog = false">
            {{ t("search.close") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { useI18n }                         from "vue-i18n"
import { usePlatoPrincipalStore }          from "../stores/PlatoPrincipal.store"
import { useBebidaStore }                  from "../stores/Bebida.store"
import { usePostreStore }                  from "../stores/Postre.store"

const { t } = useI18n()

const platosStore  = usePlatoPrincipalStore()
const bebidasStore = useBebidaStore()
const postresStore = usePostreStore()

// ── Estado filtros ──────────────────────────────────────────────────────────
const q        = ref("")
const category = ref<"all" | "platos" | "bebidas" | "postres">("all")
const sortBy   = ref<"name" | "priceAsc" | "priceDesc">("name")
const dateFrom = ref("")
const dateTo   = ref("")
const page     = ref(1)
const PAGE_SIZE = 8

const loading  = ref(false)
const detailDialog = ref(false)
const selected = ref<any>(null)

// ── Opciones desplegables ───────────────────────────────────────────────────
const categoryOptions = computed(() => [
  { label: t("search.all"),     value: "all"     },
  { label: t("admin.platos"),   value: "platos"  },
  { label: t("admin.bebidas"),  value: "bebidas" },
  { label: t("admin.postres"),  value: "postres" },
])

const sortOptions = computed(() => [
  { label: t("search.sortName"),      value: "name"      },
  { label: t("search.sortPriceAsc"),  value: "priceAsc"  },
  { label: t("search.sortPriceDesc"), value: "priceDesc" },
])

const headers = computed(() => [
  { title: t("common.name"),     key: "nombre",   sortable: false },
  { title: t("search.category"), key: "category", sortable: false },
  { title: t("common.price"),    key: "precio",   sortable: false },
  { title: "",                   key: "actions",  sortable: false },
])

// ── Unificamos todos los productos en un array plano ────────────────────────
type FlatItem = {
  key:      string
  id:       number
  nombre:   string
  precio:   number
  category: "platos" | "bebidas" | "postres"
  addedDate?: string
  [k: string]: any
}

const allItems = computed<FlatItem[]>(() => [
  ...platosStore.platos.map((p, i) => ({
    ...p,
    key:      `plato-${p.id}`,
    category: "platos" as const,
    addedDate: simulateDate(i, "platos"),
  })),
  ...bebidasStore.bebidas.map((b, i) => ({
    ...b,
    key:      `bebida-${b.id}`,
    category: "bebidas" as const,
    addedDate: simulateDate(i, "bebidas"),
  })),
  ...postresStore.postres.map((p, i) => ({
    ...p,
    key:      `postre-${p.id}`,
    category: "postres" as const,
    addedDate: simulateDate(i, "postres"),
  })),
])

// Genera una fecha simulada estable para demo (backend no la devuelve aún)
function simulateDate(idx: number, cat: string): string {
  const base   = new Date("2024-01-01")
  const offset = idx * 7 + (cat === "platos" ? 0 : cat === "bebidas" ? 100 : 200)
  base.setDate(base.getDate() + offset)
  return base.toISOString().slice(0, 10)
}

// ── Filtrado + ordenación ────────────────────────────────────────────────────
const filtered = computed<FlatItem[]>(() => {
  let list = allItems.value

  if (category.value !== "all") {
    list = list.filter(i => i.category === category.value)
  }

  if (q.value.trim()) {
    const lq = q.value.trim().toLowerCase()
    list = list.filter(i => i.nombre.toLowerCase().includes(lq))
  }

  if (dateFrom.value) {
    list = list.filter(i => (i.addedDate ?? "") >= dateFrom.value)
  }

  if (dateTo.value) {
    list = list.filter(i => (i.addedDate ?? "") <= dateTo.value)
  }

  list = [...list].sort((a, b) => {
    if (sortBy.value === "name")      return a.nombre.localeCompare(b.nombre)
    if (sortBy.value === "priceAsc")  return a.precio - b.precio
    if (sortBy.value === "priceDesc") return b.precio - a.precio
    return 0
  })

  return list
})

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PAGE_SIZE)))

const paginated = computed<FlatItem[]>(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filtered.value.slice(start, start + PAGE_SIZE)
})

// ── Helpers ─────────────────────────────────────────────────────────────────
function categoryColor(cat: string) {
  if (cat === "platos")  return "primary"
  if (cat === "bebidas") return "info"
  if (cat === "postres") return "warning"
  return "secondary"
}

function resetPage()  { page.value = 1 }
function resetAll()   {
  q.value = ""; category.value = "all"; sortBy.value = "name"
  dateFrom.value = ""; dateTo.value = ""; page.value = 1
}

function openDetail(item: FlatItem) {
  selected.value = item
  detailDialog.value = true
}

watch(sortBy, resetPage)

// ── Carga inicial ────────────────────────────────────────────────────────────
onMounted(async () => {
  loading.value = true
  await Promise.all([
    platosStore.fetchAll(),
    bebidasStore.fetchAll(),
    postresStore.fetchAll(),
  ])
  loading.value = false
})
</script>