<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import BlogContentTitle from '@/components/blog/blogcontenttitle.tsx'
import { useBlogContent } from '@/hooks/useblogcontent'
import BlogContentBody from '@/components/blog/blogcontentbody.vue'
import BlogContentComment from '@/components/blog/blogcontentcomment.tsx'
import BlogContentCommentArea from '@/components/blog/blogcontentcommentarea.tsx'
import { useBlogComment } from '@/hooks/useblogcomment'
import { blogContent } from '@/utils/blogcontentData';

const route = useRoute()
const message = useMessage()


onMounted(() => {
    const blogId = route.query.id
    message.info(`博客ID: ${blogId}`)
    getBlogContentTitle(blogId as string)
})
const { blogContentTitle, getBlogContentTitle } = useBlogContent()
const { comments, loading, handleSubmitComment } = useBlogComment()


</script>

<template>
    <div class="blog-content-container">
        <div class="blog-content-title">
            <BlogContentTitle :blogContentTitle="blogContentTitle" />
        </div>
        <div class="blog-content-body">
            <BlogContentBody :content="blogContent" />      
        </div>
        <div class="blog-content-comment">
            <BlogContentComment :onSubmitComment="handleSubmitComment" :loading="loading" />
        </div>
        <div class="blog-content-comment-area">
            <BlogContentCommentArea :comments="comments" />
        </div>
    </div>
</template>

<style scoped>
.blog-content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 100vh;
  background: #f5f5f5;
}

.blog-content-title {
  width: 100%;
  margin-bottom: 16px;
}

.blog-content-body {
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.blog-content-comment {
  width: 100%;
  margin-top: 24px;
  background: #fff;
  border-radius: 8px;
  
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
