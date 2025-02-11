<template>
  <div class="blog-header">
    <!-- 视频背景 -->
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <source :src="videoUrl" type="video/mp4">
      </video>
    </div>

    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-box">
        <input 
          type="text"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          class="search-input"
        >
        <n-button 
          type="primary" 
          secondary 
          round 
          @click="$emit('search')"
        >
          <n-icon size="18">
            <Search />
          </n-icon>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NIcon, NButton } from 'naive-ui'
import { Search } from '@vicons/ionicons5'  

defineProps<{
  videoUrl: string
  placeholder?: string
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search'): void
}>()
</script>

<style scoped>
.blog-header {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.video-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}

.video-background video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.search-container {
  position: relative;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.search-box {
  display: flex;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 8px 16px;
  font-size: 16px;
  color: #333;
  outline: none;
}

.search-input::placeholder {
  color: #999;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .blog-header {
    height: 300px;
  }
  
  .search-box {
    width: 95%;
    padding: 6px;
  }
  
  .search-input {
    font-size: 14px;
  }
}
</style>


