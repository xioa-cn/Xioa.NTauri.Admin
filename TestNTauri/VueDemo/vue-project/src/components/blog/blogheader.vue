<script setup lang="ts">
import { NButton,NAvatar } from 'naive-ui'
import { useblogLogin } from '@/hooks/useblogLogin'
import { useBlogHeaderRouter } from '@/hooks/useblogheaderrouter'
import { useWPFHeader } from "@/hooks/useWPFHeader.ts";
import { useBlogHeaderShow } from '@/hooks/useblogheadershow';

const { gologin } = useblogLogin()
const { goRouter } = useBlogHeaderRouter()
const { header } = useWPFHeader()
const { isShowAvatar } = useBlogHeaderShow()
</script>
<template>
    <header class="app-header">
        <div class="header-left  titlebar drag-region">
            <!-- <img src="../../assets/blog/blog.svg" alt="XIOA" class="logo"> -->
            <h2 class="drag-area AwesomeFont blog-headerfont">{{ header }}</h2>
        </div>
        <nav class="header-nav blog-headerfont">
            <div class="blog-header-btn" @click="goRouter('/blog')">
                🏡 <span>首页</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/main')">
                📚 <span>博客</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/list?key=like')">
                ❤️ <span>喜欢</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/write')">
                💬 <span>随笔</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/treasurechest')">
                🧰 <span>百宝箱</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/leavemessage')">
                🌏 <span>留言</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/contactus')">
                👤 <span>联系我</span>
            </div>
        </nav>
        <div class="header-right blog-headerfont">
            <n-button v-if="!isShowAvatar" @click="gologin" class="login-btn blog-header-btn">
                登录
            </n-button>
            <n-avatar v-if="isShowAvatar" round size="large" class="blog-header-avator" src="empty.png"
                fallback-src="/header.jpg" />
        </div>
    </header>
</template>



<style scoped>
@import '@/assets/blog/blogfont.css';

.blog-header-avator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0;  /* 上下margin自动 */
    cursor: pointer;
}

/* 可选：添加悬浮效果 */
.blog-header-avator:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
}

.app-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    padding: 0 24px;
    z-index: 1000;
    transition: background-color 0.3s ease;
}

.app-header:hover {
    background: rgba(0, 0, 0, 0.701);
}

.header-left {
    flex-shrink: 0;
}

.drag-area {
    min-width: 300px;
}

.logo {
    height: 40px;
    margin-left: 10px;
    margin-right: 200px;
}

.header-nav {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 32px;
    margin-right: 32px;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #666;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s;
    padding: 8px 12px;
    border-radius: 4px;
}

.nav-item:hover {
    color: #18a058;
    background: rgba(0, 0, 0, 0.05);
}

.nav-item.router-link-active {
    color: #18a058;
}

.header-right {
    flex-shrink: 0;
}

.login-btn {
    border-radius: 16px;
}

.blog-header-btn {
    cursor: pointer;
    padding: 8px 12px;
    transition: color 0.3s ease;
    color: #fff;
}

.blog-header-btn:hover {
    color: #FFD700;
    /* 鼠标悬停时变成金黄色 */
}
</style>