<template>
  <div class="weather-city-page">
    <weather-header class="weather-city-page__header" />
    <div class="weather-city-page__content">
      <weather-table
        v-if="!loading && days.length"
        :days="days"
        :data="tableData"
        class="weather-city-page__table"
      />
      <n-spin v-else class="weather-city-page__spin" size="large">
        <template #description>Загрузка погоды...</template>
      </n-spin>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useWeatherStore } from '@/stores/weather'
import WeatherHeader from '../components/WeatherHeader.vue'
import WeatherTable from '../components/WeatherTable.vue'

const route = useRoute()
const weatherStore = useWeatherStore()

const loading = ref(true)

const days = computed(() => {
  const country = route.params.country as string
  return weatherStore.weatherByCountry[country]?.days || []
})
const tableData = computed(() => {
  const country = route.params.country as string
  return weatherStore.weatherByCountry[country]?.data || []
})

onMounted(loadCurrentWeather)

function loadCurrentWeather() {
  loading.value = true
  const country = route.params.country as string
  weatherStore.getWeatherByCountry(country).finally(() => {
    loading.value = false
  })
}

watch(
  () => route.params.country,
  () => {
    loadCurrentWeather()
  },
)
</script>

<style lang="scss" scoped>
.weather-city-page {
  min-height: 65vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
  }

  &__content {
    margin: 0 auto;
    flex: 1 1 auto;
    padding: 36px 12px 12px 12px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    min-height: 320px;

    @media (max-width: 900px) {
      max-width: 100vw;
      padding: 18px 3vw 6px 3vw;
      min-height: 160px;
    }
  }

  &__table {
    width: 100%;

    @media (max-width: 420px) {
      min-width: 200px;
      max-width: 300px;
      font-size: 11px;
    }
  }

  &__spin {
    margin: 100px auto 0;

    @media (max-width: 900px) {
      margin: 50px auto 0;
    }
  }

  &__cell {
    @media (max-width: 420px) {
      width: 40px;
      min-width: 35px;
      max-width: 52px;
      padding: 1px 0;
      font-size: 10px;
    }
  }

  &_cell--head {
    font-size: 10px;
    padding: 1px 0;

    @media (max-width: 420px) {
      font-size: 10px;
      padding: 1px 0;
    }
  }
}
</style>
