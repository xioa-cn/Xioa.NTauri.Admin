<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ref } from 'vue'
import usePostMessage from '@/ntauri/usePostMessage'
import {
  RemoveOutline,
  CloseOutline,
  ScanOutline,
  RepeatOutline
} from '@vicons/ionicons5'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NButton, NIcon, NMessageProvider } from 'naive-ui'
import Header from '@/components/main/header.vue'
import { useRoot } from '@/hooks/useRoot';
import { useWebViewWindow } from '@/hooks/useWebViewWindow';

const { isMaximized, handleMinimize, handleMaximize, handleClose } = useWebViewWindow();

const root = useRoot();

</script>

<template>
  <n-config-provider class="app-container">
   
      <n-layout>
        <n-layout-header class="header">
          <div class="move-window titlebar drag-region">
            <Header />
          </div>
          <div class="window-controls-container" v-if="root">
            <div class="window-controls">
              <n-button quaternary circle size="small" @click="handleMinimize">
                <template #icon>
                  <n-icon>
                    <RemoveOutline />
                  </n-icon>
                </template>
              </n-button>
              <n-button quaternary circle size="small" @click="handleMaximize">
                <template #icon>
                  <n-icon>
                    <RepeatOutline v-if="isMaximized" />
                    <ScanOutline v-else />
                  </n-icon>
                </template>
              </n-button>
              <n-button quaternary circle size="small" @click="handleClose">
                <template #icon>
                  <n-icon>
                    <CloseOutline />
                  </n-icon>
                </template>
              </n-button>
            </div>
          </div>
        </n-layout-header>
        <RouterView />
      </n-layout>
  
  </n-config-provider>
</template>

<style scoped>
.header {
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  position: relative;
}

.app-container {
  height: 100vh;
  width: 100vw;
}

.move-window {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-app-region: drag;
  z-index: 1;
}

.window-controls-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-right: 8px;
  z-index: 1;
}

.window-controls {
  display: flex;
  gap: 4px;
  -webkit-app-region: no-drag;
}
</style>
