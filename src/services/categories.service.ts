import { API_URL, httpGet, httpPost, httpPut, httpDelete } from "./http"
import type { Category } from "../types/category"

const BASE = `${API_URL}/categories`

export const fetchCategories = () => httpGet<Category[]>(BASE)
export const createCategory = (data: Category) => httpPost<Category>(BASE, data)
export const updateCategory = (id: number, data: Category) =>
  httpPut<Category>(`${BASE}/${id}`, data)
export const deleteCategory = (id: number) => httpDelete(`${BASE}/${id}`)
