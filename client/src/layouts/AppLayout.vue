<template>
  <div class="app-layout">
    <weather-header />
    <main class="app-layout__main">
      <router-view />
    </main>
  </div>
</template>
<script setup lang="ts">
import WeatherHeader from '@/components/WeatherHeader.vue';
</script>
