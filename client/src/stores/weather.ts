import { useHelpers } from '@/helpers/useHelpers.ts'
import { defineStore } from 'pinia'
import { getWeather, getCities } from '@/services/api.ts'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    countries: [] as string[],
    weatherByCountry: {} as Record<string, { days: string[]; data: any[] }>,
  }),
  actions: {
    async getCountries() {
      if (!this.countries.length) {
        this.countries = await getCities()
      }
    },
    async getWeatherByCountry(country: string) {
      const { CACHE_TTL } = useHelpers()

      const cached = this.weatherByCountry[country]
      const isStale = !cached || (Date.now() - cached.createdAt) > CACHE_TTL

      if (isStale) {
        const weatherData = await getWeather(country)

        this.weatherByCountry[country] = {
          data: weatherData.weather.map((str: string) => {
            const [desc, temp] = str.split(',')
            return {
              description: desc.trim(),
              temperature: temp ? temp.trim() : '',
            }
          }),
          createdAt: Date.now(),
        }
      }
    },
  },
})
