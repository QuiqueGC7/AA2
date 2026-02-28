import { API_URL, httpGet, httpPost, httpPut, httpDelete } from "./http"
import type { Product } from "../types/product"

const BASE = `${API_URL}/products`

export const fetchProducts = () => httpGet<Product[]>(BASE)
export const createProduct = (data: Product) => httpPost<Product>(BASE, data)
export const updateProduct = (id: number, data: Product) =>
  httpPut<Product>(`${BASE}/${id}`, data)
export const deleteProduct = (id: number) => httpDelete(`${BASE}/${id}`)
