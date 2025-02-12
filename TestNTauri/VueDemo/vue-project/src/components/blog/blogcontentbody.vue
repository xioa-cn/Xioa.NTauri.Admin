<template>
  <div class="blog-content">
    <template v-for="(section, index) in content" :key="index">
      <!-- 章节标题 -->
      <section class="content-section" v-if="section.type === 'section'">
        <h2 class="section-title">
          <span class="hash">#</span> {{ section.title }}
        </h2>
        
        <!-- 递归渲染子内容 -->
        <template v-for="(item, itemIndex) in section.content" :key="itemIndex">
          <!-- 图片网格 -->
          <div v-if="item.type === 'image-grid'" class="image-grid">
            <div   class="grid-item">
              <img :src="item.image" :alt="item.title" class="grid-item-image">
            </div>
          </div>

          <!-- 普通文本 -->
          <p v-else-if="item.type === 'text'" class="text-content">
            {{ item.content }}
          </p>

          <!-- 代码块 -->
          <div v-else-if="item.type === 'code'" class="code-block">
            <code>{{ item.content }}</code>
          </div>

          <!-- 警告框 -->
          <div v-else-if="item.type === 'warning'" class="warning-box">
            <p v-html="renderWithInlineCode(item.content || '')"></p>
          </div>

          <!-- 信息框 -->
          <div v-else-if="item.type === 'info'" class="info-box">
            <p v-html="renderWithInlineCode(item.content || '')"></p>
          </div>

          <!-- 链接 -->
          <p v-else-if="item.type === 'link'" class="reference">
            <a :href="item.url" class="link">{{ item.text }}</a>
          </p>

          <!-- 列表 -->
          <div v-else-if="item.type === 'list'" class="list-content">
            <p v-if="item.description">{{ item.description }}</p>
            <ul>
              <li v-for="(listItem, listIndex) in item.items" :key="listIndex">
                {{ listItem }}
              </li>
            </ul>
          </div>
        </template>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">

interface Props {
  content: any;
}

defineProps<Props>();
// 处理内联代码
const renderWithInlineCode = (text: string) => {
  return text.replace(/`([^`]+)`/g, '<code class="code-inline">$1</code>');
};
</script>

<style scoped>
.blog-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
}

.section-title {
  font-size: 1.8em;
  margin: 30px 0 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hash {
  color: #ff6b6b;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(800px, 1fr));
  height: 400px;
  gap: 20px;
  margin: 20px 0;
}

.grid-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
}

.grid-item:hover {
  transform: translateY(-5px);
}

.grid-item img {
  width: 100%;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.item-title {
  padding: 10px;
  font-weight: bold;
  flex: 1;
}

.item-meta {
  padding: 0 10px 10px;
  font-size: 0.9em;
  color: #666;
  display: flex;
  justify-content: space-between;
  width: 100%; /* 确保meta信息宽度与图片一致 */
  box-sizing: border-box;
}

.code-inline {
  background: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  color: #e83e8c;
  font-family: monospace;
}

.warning-box {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
}

.info-box {
  background: #cce5ff;
  border-left: 4px solid #007bff;
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
}

.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

ul {
  padding-left: 20px;
  margin: 10px 0;
}

li {
  margin: 8px 0;
  line-height: 1.6;
}
</style>


