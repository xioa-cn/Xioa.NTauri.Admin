<template>
  <div class="blog-center-btn-list">
    <div class="btn-item" @click="$emit('click', '开发技术')">
      <div class="icon-wrapper">
        <img src="/mainbtn.jpg" alt="poetize">
      </div>
      <div class="content">
        <div class="title">开发技术</div>
        <div class="subtitle">从入门到精通</div>
      </div>
    </div>

    <div class="btn-item" @click="$emit('click', '生活倒影')">
      <div class="icon-wrapper">
        <img src="/mainbtn.jpg" alt="life">
      </div>
      <div class="content">
        <div class="title">生活倒影</div>
        <div class="subtitle">记录美好生活</div>
      </div>
    </div>

    <div class="btn-item" @click="$emit('click', '资源共享')">
      <div class="icon-wrapper">
        <img src="/mainbtn.jpg" alt="media">
      </div>
      <div class="content">
        <div class="title">资源共享</div>
        <div class="subtitle">寻找有趣的资源</div>
      </div>
    </div>

    <div class="btn-item" @click="$emit('click', '阅读')">
      <div class="icon-wrapper">
        <img src="/mainbtn.jpg" alt="resource">
      </div>
      <div class="content">
        <div class="title">阅读</div>
        <div class="subtitle">阅读，分享，成长</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click', type: string): void
}>()
</script>

<style scoped>
.blog-center-btn-list {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.btn-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
  min-width: 250px;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.btn-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.icon-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  flex: 1;
}

.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 4px;
}

.subtitle {
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .blog-center-btn-list {
    padding: 10px;
    gap: 10px;
  }

  .btn-item {
    width: 100%;
    padding: 15px;
  }
}
</style>
