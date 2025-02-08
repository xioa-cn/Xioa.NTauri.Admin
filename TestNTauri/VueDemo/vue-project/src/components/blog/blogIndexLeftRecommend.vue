<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { BookOutline } from '@vicons/ionicons5'
import { useRecommend } from '@/hooks/useRecommend'

const { recommendList } = useRecommend()

</script>

<template>
  <div class="recommend-container">
    <div class="recommend-header">
      <n-icon size="20" color="#4CAF50">
        <BookOutline />
      </n-icon>
      <span class="header-text">推荐文章</span>
    </div>
    
    <div class="article-list">
      <div v-for="(item, index) in recommendList" 
           :key="index" 
           class="article-item">
        <img :src="item.image" class="article-image">
        <div class="article-info">
          <div class="article-title">{{ item.title }}</div>
          <div class="article-date">{{ item.date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recommend-container {
  
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.recommend-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
}

.header-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.article-item {
  display: flex;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.article-item:hover {
  transform: translateX(4px);
}

.article-image {
  width: 80px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
}

.article-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.article-title {
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-date {
  font-size: 12px;
  color: #999;
}
</style>
