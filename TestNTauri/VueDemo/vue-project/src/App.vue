<script setup lang="ts">
import BaseView from '@/views/BaseView.vue';
import { NMessageProvider, NConfigProvider, NLoadingBarProvider } from 'naive-ui';
import { useAppStore } from '@/stores/appstore';
import { useThemes } from '@/hooks/useThemes';

const { ThemeOverrides } = useThemes();
const appStore = useAppStore();

</script>
<template>
  <NConfigProvider :theme-overrides="ThemeOverrides">
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