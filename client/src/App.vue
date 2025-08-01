<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  background: #f9fbfd;
  background: linear-gradient(132deg, #f2f8fd 40%, #e1ebf8 100%);
}

.container {
  max-width: 1232px;
  margin: 0 auto;
  padding: 0 16px;

  @media (max-width: 600px) {
    padding: 0;
  }
}
</style>
<script setup lang="ts"></script>
