<template>
  <n-form class="login-form" @submit.prevent="onSubmit">
    <n-form-item label="Email" :feedback="emailError" class="login-form__item">
      <n-input v-model:value="email" placeholder="Email" class="login-form__input" />
    </n-form-item>
    <n-form-item label="Пароль" :feedback="passwordError" class="login-form__item">
      <n-input
        type="password"
        v-model:value="password"
        placeholder="Пароль"
        class="login-form__input"
      />
    </n-form-item>
    <n-button type="primary" attr-type="submit" block :loading="loading" class="login-form__button">
      Войти
    </n-button>
    <div v-if="submitError" class="login-form__error">
      {{ submitError }}
    </div>
  </n-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const emailError = ref('')
const passwordError = ref('')
const submitError = ref('')

function validateEmail(val: string) {
  return /\S+@\S+\.\S+/.test(val)
}

const onSubmit = async () => {
  emailError.value = ''
  passwordError.value = ''
  submitError.value = ''

  let hasError = false

  if (!validateEmail(email.value)) {
    emailError.value = 'Please enter valid email address'
    hasError = true
  }
  if (!password.value) {
    passwordError.value = 'Enter your password'
    hasError = true
  }

  if (hasError) return

  loading.value = true

  try {
    await authStore.login(email.value, password.value)
    router.push('/weather')
  } catch (e) {
    submitError.value = (e as Error).message
  }

  loading.value = false
}
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding: 40px 32px 32px 32px;
  box-shadow: 0 2px 24px 0 #cfd8dc44;
  border-radius: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 18px;

  @media (max-width: 600px) {
    padding: 20px 6vw 20px 6vw;
    box-shadow: 0 1px 8px 0 #cfd8dc44;
    border-radius: 12px;
    gap: 10px;
  }

  @media (max-width: 420px) {
    width: auto;
  }

  &__item {
    margin-bottom: 0;
  }

  &__input {
    font-size: 18px;
    min-height: 44px;

    @media (max-width: 600px) {
      font-size: 15px;
      min-height: 38px;
    }
  }

  &__button {
    margin-top: 6px;
    font-size: 17px;
    border-radius: 8px;

    @media (max-width: 600px) {
      font-size: 15px;
    }
  }

  &__error {
    color: #e53935;
    margin-top: 10px;
    font-size: 15px;
    text-align: center;
  }
}
</style>
