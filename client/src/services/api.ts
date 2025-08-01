import { useAuthStore } from '@/stores/auth'

const API = import.meta.env.VITE_API_BASE_URL;

const handleAuthError = async (res: Response) => {
  if (res.status === 401 || res.status === 403) {
    const authStore = useAuthStore()
    authStore.logout()
    window.location.href = '/login'
    throw new Error('Your session has expired')
  }
}


export async function login(email: string, password: string) {
  const res = await fetch(`${API}/log-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  await handleAuthError(res)
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Login error");
  }
  return await res.json();
}

export async function getCities(token: string) {
  const res = await fetch(`${API}/cities`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  await handleAuthError(res)
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error getting countries");
  }
  const data = await res.json();
  return data.cities;
}

export async function getWeather(token: string, country: string) {
  const res = await fetch(`${API}/weather/${country}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  await handleAuthError(res)
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Error getting forecast')
  }
  return await res.json();
}
