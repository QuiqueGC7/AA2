import { defineStore } from "pinia"
import type { Category } from "../types/category"
import * as service from "../services/categories.service"

export const useCategoriesStore = defineStore("categories", {
  state: () => ({
    items: [] as Category[],
  }),

  actions: {
    async loadAll() {
      this.items = await service.fetchCategories()
    },

    async create(category: Category) {
      const created = await service.createCategory(category)
      this.items.push(created)
    },

    async update(id: number, category: Category) {
      const updated = await service.updateCategory(id, category)
      const index = this.items.findIndex((c) => c.id === id)
      if (index !== -1) this.items[index] = updated
    },

    async remove(id: number) {
      await service.deleteCategory(id)
      this.items = this.items.filter((c) => c.id !== id)
    },
  },
})
