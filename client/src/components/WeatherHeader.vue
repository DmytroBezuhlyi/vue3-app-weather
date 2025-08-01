<template>
  <n-layout-header class="weather-header">
    <div class="weather-header__container">
      <template v-if="isMobile">
        <div class="weather-header__mobile-scroll">
          <button
            v-for="option in menuOptions"
            :key="option.key"
            :class="[
              'weather-header__mobile-item',
              { 'weather-header__mobile-item--active': option.key === current },
            ]"
            @click="goToCountry(option.key)"
          >
            {{ option.label }}
          </button>
        </div>
      </template>
      <template v-else>
        <n-menu
          :options="menuOptions"
          :value="current"
          mode="horizontal"
          @update:value="goToCountry"
          class="weather-header__menu"
        />
      </template>
      <n-button type="error" class="weather-header__logout-btn" @click="logout" ghost>
        Выйти
      </n-button>
    </div>
  </n-layout-header>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWeatherStore } from '@/stores/weather'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const weatherStore = useWeatherStore()
const authStore = useAuthStore()

const isMobile = ref(window.innerWidth <= 600)

const menuOptions = computed(() => weatherStore.countries.map((c) => ({ label: c, key: c })))
const currentCountry = computed(() => route.params.country || '')

onMounted(() => {
  weatherStore.getCountries()
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => window.removeEventListener('resize', handleResize))

function goToCountry(country: string) {
  if (country && country !== currentCountry.value) {
    router.push(`/weather/${country}`)
  }
}

const handleResize = () => {
  isMobile.value = window.innerWidth <= 600
}

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.weather-header {
  background: #fff;
  padding: 0;
  border-bottom: 1px solid #eee;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 56px;
    padding: 0 24px;

    @media (max-width: 900px) {
      padding: 0 8px;
      min-height: 48px;
    }

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: stretch;
      gap: 5px;
      padding: 5px 2px 2px 2px;
      min-height: unset;
    }
  }

  &__menu {
    flex: 1 1 auto;
    min-width: 0;
  }

  &__logout-btn {
    margin-left: 32px;
    min-width: 96px;
    font-size: 16px;

    @media (max-width: 900px) {
      min-width: 72px;
      font-size: 15px;
      margin-left: 16px;
    }

    @media (max-width: 600px) {
      width: 100%;
      margin: 0;
      font-size: 14px;
      min-width: 0;
    }
  }

  &__mobile-scroll {
    display: flex;
    gap: 3px;
    overflow-x: auto;
    flex: 1 1 auto;
    margin-right: 8px;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f7f7f7;

    @media (max-width: 600px) {
      margin-bottom: 3px;
      padding-bottom: 2px;
    }
  }

  &__mobile-item {
    display: inline-block;
    background: transparent;
    font-size: 15px;
    padding: 2px 11px;
    border-radius: 14px;
    margin-right: 2px;
    color: #6b7e99;
    cursor: pointer;
    transition:
      background 0.15s,
      color 0.15s;
    white-space: nowrap;
    border: 1px solid transparent;
  }

  &__mobile-item--active,
  &__mobile-item:hover {
    background: #e8f2fd;
    color: #3567b2;
    border: 1px solid #94c6f9;
  }
}
</style>
