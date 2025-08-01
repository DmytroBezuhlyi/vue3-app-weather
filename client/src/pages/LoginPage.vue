<template>
  <div class="login-page">
    <div class="login-page__content">
      <login-form class="login-page__form" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    width: 100%;
    max-width: 430px;
    margin: 0 auto;
    padding: 36px 14px 28px 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
