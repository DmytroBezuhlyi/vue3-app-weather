const API = import.meta.env.VITE_API_BASE_URL;

export async function login(email: string, password: string) {
  const res = await fetch(`${API}/log-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Ошибка входа");
  }
  return await res.json();
}

export async function getCities(token: string) {
  const res = await fetch(`${API}/cities`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Ошибка получения списка стран");
  }
  const data = await res.json();
  return data.cities;
}

export async function getWeather(token: string, country: string) {
  const res = await fetch(`${API}/weather/${country}`, {
    method: "GET",
    headers: { "Authorization": `Bearer ${token}` },
  });
  if (!res.ok) {
    const data = await res.json()
    throw new Error(data.error || 'Ошибка получения погоды')
  }
  return await res.json();
}
