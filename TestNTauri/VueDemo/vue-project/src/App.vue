<script setup lang="ts">
import BaseView from '@/views/BaseView.vue';
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui';
import { useAppStore } from '@/stores/appstore';
const appStore = useAppStore();
</script>
<template>
  <NConfigProvider :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <NLoadingBarProvider>
      <n-message-provider>
          <BaseView />
      </n-message-provider>
    </NLoadingBarProvider>
  </NConfigProvider>
</template>

<style scoped>
  .bg-white {
    background-color: #ffffff;
  }
</style>