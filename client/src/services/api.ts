import { apiRequest } from '@/services/http.ts'

export async function login(email: string, password: string) {
  return await apiRequest('/log-in', {
    method: 'POST',
    body: JSON.stringify({email, password}),
  }, false)
}

export async function getCities() {
  const res = await apiRequest('/cities')
  return res.cities
}

export async function getWeather(country: string) {
  return await apiRequest(`/weather/${country}`)
}
