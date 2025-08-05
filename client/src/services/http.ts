import { useAuthStore } from '@/stores/auth.ts'

export async function apiRequest(url: string, options: RequestInit = {}, withAuth: boolean = true) {
  const authStore = useAuthStore()
  const headers = {
    ...(options.headers || {}),
    ...(withAuth && authStore.token ? { Authorization: `Bearer ${authStore.token}` } : {}),
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(async () => controller.abort(), 7000)

  try {
    const res = await fetch(import.meta.env.VITE_API_BASE_URL + url, {
      ...options,
      headers,
      signal: controller.signal,
    })
    clearTimeout(timeoutId)
    if (res.status === 401 || res.status === 403) {
      authStore.logout()
      window.location.href = '/login'
      throw new Error('Session has expired')
    }
    if (!res.ok) {
      let error
      try {
        error = (await res.json()).error
      } catch {
        error = res.statusText
      }
      throw new Error(error || 'Request Error')
    }
    return await res.json()
  } catch (e: any) {
    if (e.name === 'AbortError') {
      throw new Error('Timeout limit exceeded')
    }
    throw e
  }
}
