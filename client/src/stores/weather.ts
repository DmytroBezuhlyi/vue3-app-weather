import { defineStore } from "pinia";
import { getWeather, getCities } from "@/services/api.ts";
import { useAuthStore } from "@/stores/auth.ts";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    countries: [] as string[],
    weatherByCountry: {} as Record<string, { days: string[], data: any[] }>,
  }),
  actions: {
    async getCountries() {
      if (!this.countries.length) {
        const authStore = useAuthStore();
        this.countries = await getCities(authStore.token!);
      }
    },
    async getWeatherByCountry(country: string) {
      if (!this.weatherByCountry[country]) {
        const authStore = useAuthStore()
        const weatherData = await getWeather(authStore.token!, country)

        this.weatherByCountry[country] = {
          days: ['Mon', 'Tue', 'Wen', 'Thr', 'Fri', 'Sat', 'Sun'],
          data: weatherData.weather.map((str: string) => {
            const [desc, temp] = str.split(',')
            return {
              description: desc.trim(),
              temperature: temp ? temp.trim() : ''
            }
          })
        }
      }
    }
  },
});
