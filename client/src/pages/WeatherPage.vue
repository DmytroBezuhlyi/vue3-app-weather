<template>
  <div class="weather-page">
    <weather-header class="weather-page__header" />
    <div class="weather-page__content">
      <div class="weather-page__welcome">Select the country to see the forecast</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherHeader from '@/components/WeatherHeader.vue'
</script>

<style lang="scss" scoped>
.weather-page {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__header {
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    height: calc(100vh - 120px);
    padding-top: 24px;

    @media (max-width: 700px) {
      padding-top: 14px;
    }
  }

  &__welcome {
    font-size: 22px;
    font-weight: 500;
    color: #5076a8;
    padding: 32px 40px;
    border-radius: 16px;
    text-align: center;

    @media (max-width: 700px) {
      font-size: 17px;
      padding: 20px 10px;
      border-radius: 10px;
    }
  }
}
</style>
