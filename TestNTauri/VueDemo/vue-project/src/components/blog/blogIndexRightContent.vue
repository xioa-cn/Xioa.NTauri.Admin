<script setup lang="ts">
import { useBlogIndexContent } from '@/hooks/useblogIndexContent'
import { onMounted } from 'vue'
import { useLookBlog } from '@/hooks/uselookblog'

const { blogPosts, getBlogPosts } = useBlogIndexContent()

onMounted(() => {
    getBlogPosts()
})


const { goBlogContent } = useLookBlog()

</script>

<template>

  <div class="blog-list">
    <div v-for="post in blogPosts" @click="goBlogContent(post.id)" :key="post.title" class="blog-card">
      <div class="blog-card-image">
        <img :src="post.coverImage" :alt="post.title">
      </div>
      <div class="blog-card-content">
        <div class="post-meta">
          <span class="post-date">
            <i class="fas fa-calendar"></i>
            发布于 {{ post.date }}
          </span>
        </div>
        <h2 class="post-title">{{ post.title }}</h2>
        <div class="post-stats">
          <span class="stat">
            <i class="fas fa-eye"></i>
            {{ post.views }} 热度
          </span>
          <span class="stat">
            <i class="fas fa-comment"></i>
            {{ post.comments }} 评论
          </span>
          <span class="stat">
            <i class="fas fa-heart"></i>
            {{ post.likes }} 赞
          </span>
        </div>
        <div class="post-tags">
          <span class="category">📁 {{ post.category }}</span>
          <span v-for="tag in post.tags" :key="tag" class="tag">
            🏷️ {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.blog-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.blog-card-image {
  height: 200px;
  overflow: hidden;
}

.blog-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card-image img {
  transform: scale(1.05);
}

.blog-card-content {
  padding: 16px;
}

.post-meta {
  font-size: 0.9em;
  color: #666;
  margin-bottom: 8px;
}

.post-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 8px 0;
  color: #333;
}

.post-stats {
  display: flex;
  gap: 16px;
  font-size: 0.9em;
  color: #666;
  margin: 8px 0;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.category, .tag {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  background: #f5f5f5;
  color: #666;
}

.category {
  background: #e3f2fd;
  color: #1976d2;
}
</style>
