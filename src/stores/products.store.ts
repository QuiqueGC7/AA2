import { defineStore } from "pinia"
import type { Product } from "../types/product"
import * as service from "../services/products.service"
import { useUIStore } from "./ui.store"

export const useProductsStore = defineStore("products", {
  state: () => ({
    items: [] as Product[],
  }),

  actions: {
    async loadAll() {
      const ui = useUIStore()
      ui.setLoading(true)
      this.items = await service.fetchProducts()
      ui.setLoading(false)
    },

    async create(product: Product) {
      const created = await service.createProduct(product)
      this.items.push(created)
    },

    async update(id: number, product: Product) {
      const updated = await service.updateProduct(id, product)
      const index = this.items.findIndex((p) => p.id === id)
      if (index !== -1) this.items[index] = updated
    },

    async remove(id: number) {
      await service.deleteProduct(id)
      this.items = this.items.filter((p) => p.id !== id)
    },
  },
})
