<script setup lang="ts">
import BlogMainHeader from '@/components/blog/blogmainheader.vue';
import BlogCenterBtnList from '@/components/blog/blogcenterbtnlist.vue';
import { NIcon } from 'naive-ui';
import { Gift, Nutrition } from '@vicons/ionicons5';
import FastCard from '@/components/blog/fastcard.tsx';
import { useLookBlog } from '@/hooks/uselookblog';
import { useBlogMain } from '@/hooks/useblogmain';

const { goBlogContent } = useLookBlog()

const { blogtags, searchText, handleSearch, handleClick, serposts } = useBlogMain()



</script>

<template>
    <div class="blog-main-container">
        <div class="blog-main-header-container">
            <BlogMainHeader v-model="searchText" video-url="/list.mp4" placeholder="搜索你感兴趣的内容..."
                @search="handleSearch" />
        </div>
        <div class="blog-center-btn-list-container">
            <BlogCenterBtnList @click="handleClick" />
        </div>
        <div class="blog-main-content-container">
            <div class="recommend-header">
                <div class="recommend-left">
                    <n-icon size="20" color="#666">
                        <Gift />
                    </n-icon>
                    <span class="recommend-text">{{ blogtags }}</span>
                </div>
                <div class="recommend-right">
                    <n-icon size="20" color="#ff9800">
                        <Nutrition />
                    </n-icon>
                </div>
            </div>
            <div class="blog-list">
                <FastCard v-for="(post, index) in serposts" @click="goBlogContent(post.id)" :key="post.id" :post="post"
                    :index="index" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.blog-main-container {
    width: 100%;
    min-height: 100vh;
    background: #f4f5f7;
    position: relative;
}

.blog-main-header-container {
    position: relative;
    z-index: 1;
}

.blog-center-btn-list-container {
    position: relative;
    z-index: 2;
    margin-top: -100px;
}

.recommend-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    background: #fff;
    border-radius: 8px;
    margin: 0 20px;
    width: 76vw;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.recommend-left {
    display: flex;
    align-items: center;
    gap: 8px;
}

.recommend-text {
    font-size: 16px;
    color: #666;
    font-weight: 500;
}

.blog-list {
    width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.blog-main-content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
