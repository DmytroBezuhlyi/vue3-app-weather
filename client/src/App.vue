<template>
  <div class="app">
    <div class="app__container">
      <router-view />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background: #f9fbfd;
  background: linear-gradient(132deg, #f2f8fd 40%, #e1ebf8 100%);

  &__container {
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    min-height: 100vh;
    box-sizing: border-box;

    @media (max-width: 900px) {
      .app__container {
        max-width: 100vw;
      }
    }
  }
}

</style>
<script setup lang="ts">
</script>
