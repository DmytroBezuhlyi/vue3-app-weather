<template>
  <div class="weather-table">
    <div class="weather-table__scroll">
      <n-table :bordered="true" :single-line="false" class="weather-table__table">
        <thead>
          <tr>
            <th
              v-for="day in days"
              :key="day"
              class="weather-table__cell weather-table__cell--head"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              v-for="item in data"
              :key="item.description + item.temperature"
              class="weather-table__cell weather-table__cell--body"
            >
              {{ item.description }}, {{ item.temperature }}
            </td>
          </tr>
        </tbody>
      </n-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  days: string[]
  data: { description: string; temperature: string }[]
}>()
</script>

<style lang="scss" scoped>
.weather-table {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12px 0 0 0;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 0;
  }

  &__table {
    min-width: 650px;
    max-width: 100%;
    width: 100%;
    table-layout: fixed;
    text-align: center;

    @media (max-width: 900px) {
      min-width: 560px;
      font-size: 15px;
    }

    @media (max-width: 600px) {
      min-width: 420px;
      font-size: 13px;
    }
  }

  &__cell {
    width: 110px;
    min-width: 90px;
    max-width: 140px;
    word-break: break-word;
    white-space: normal;
    text-align: center;
    padding: 8px 2px;

    @media (max-width: 900px) {
      width: 82px;
      min-width: 70px;
      max-width: 110px;
      padding: 5px 2px;
      font-size: 14px;
    }

    @media (max-width: 600px) {
      width: 54px;
      min-width: 46px;
      max-width: 80px;
      padding: 2px 1px;
      font-size: 12px;
    }
  }

  &__cell--head {
    font-weight: 700;
    font-size: 17px;

    @media (max-width: 900px) {
      font-size: 15px;
    }

    @media (max-width: 600px) {
      font-size: 13px;
    }
  }

  &__cell--body {
    font-size: 16px;
  }

  &__scroll {
    width: 100%;
    overflow-x: auto;
  }
}

.weather-table__table {
  overflow-x: auto;
}
</style>
