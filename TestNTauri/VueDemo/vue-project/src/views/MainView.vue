<script setup lang="ts">
import {
  NConfigProvider, NLayout, NLayoutHeader, NLayoutSider,
  NLayoutContent, NLayoutFooter, NDialogProvider
} from 'naive-ui'
import { createTheme, inputDark, datePickerDark } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import Header from '@/components/main/header.vue'
import Footer from '@/components/main/footer.vue'
import Nav from '@/components/main/nav.vue'
import { ref } from 'vue'

const darkTheme = createTheme([inputDark, datePickerDark])

const collapsed = ref(false)
</script>

<template>
  <n-config-provider :theme="darkTheme" :locale="zhCN" :date-locale="dateZhCN"
    :theme-overrides="{ common: { fontWeightStrong: '600' } }">
    <n-dialog-provider>
      <n-layout class="layout-container">
        <n-layout-header class="header" bordered>
        
        </n-layout-header>
        <n-layout has-sider position="absolute" class="main-content">
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :collapsed="collapsed"
            show-trigger
            @collapse="collapsed = true"
            @expand="collapsed = false"
          >
            <Nav :collapsed="collapsed" />
          </n-layout-sider>
          <n-layout style="padding: 14px;" :native-scrollbar="false">
            <RouterView />
          </n-layout>
        </n-layout>
        <n-layout-footer class="footer" bordered>
          <Footer />
        </n-layout-footer>
      </n-layout>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped>
.layout-container {
  height: calc(100vh - 48px);
  width: 100vw;
}

.header {
  height: 1px;
  padding: 0;
}

.main-content {
  width: auto;
  top: 2px;
  bottom: 64px;
}

.footer {
  height: 64px;
  padding: 24px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  background: black;
}
</style>
