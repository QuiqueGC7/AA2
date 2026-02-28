export const API_URL = "https://mi-backend.com/api"

export async function httpGet<T>(url: string): Promise<T> {
  const res = await fetch(url)
  return res.json()
}

export async function httpPost<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function httpPut<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function httpDelete(url: string): Promise<void> {
  await fetch(url, { method: "DELETE" })
}
