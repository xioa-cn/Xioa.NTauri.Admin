<template>
  <n-layout-content class="layout-content">
    <div class="welcome-container">
      <div class="welcome-content">
        <h1 class="title">Xioa NTauri Admin</h1>
        <p class="description">基于 Vue 3 和 Naive UI 的后台管理系统</p>
        <p class="sub-description">使用 C# TypeScript 语言</p>
        <div class="button-group">
          <n-button type="primary" size="large" class="action-button">
            GitHub
          </n-button>
        </div>
      </div>
      <div class="decoration">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
    </div>
  </n-layout-content>
</template>

<script setup lang="ts">
import { NButton, NLayoutContent } from 'naive-ui'
</script>

<style scoped>
.layout-content {
  height: 100%;
}

.welcome-container {
  height: calc(100vh - 144px); /* 减去头部和底部的总高度 */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
}

.welcome-content {
  text-align: center;
  z-index: 1;
  padding: 24px;
}

.title {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 16px;
  background: linear-gradient(315deg, #18A058 25%, #2080F0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-color-1);
}

.sub-description {
  font-size: 16px;
  margin-bottom: 32px;
  color: var(--text-color-2);
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.action-button {
  min-width: 120px;
}

.decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50%;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: #18A058;
  top: -100px;
  left: -100px;
  opacity: 0.1;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: #2080F0;
  bottom: -50px;
  right: -50px;
  opacity: 0.1;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: #F0A020;
  top: 20%;
  right: 15%;
  opacity: 0.1;
}

.shape-4 {
  width: 100px;
  height: 100px;
  background: #D03050;
  bottom: 20%;
  left: 15%;
  opacity: 0.1;
}

.shape-5 {
  width: 50px;
  height: 50px;
  background: #18A058;
  top: 40%;
  left: 30%;
  opacity: 0.1;
}
</style>