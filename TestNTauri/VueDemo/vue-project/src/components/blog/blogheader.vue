<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useblogLogin } from '@/hooks/useblogLogin'
import { useBlogHeaderRouter } from '@/hooks/useblogheaderrouter'

const { gologin } = useblogLogin()
const { goRouter } = useBlogHeaderRouter()
</script>
<template>
    <header class="app-header">
        <div class="header-left  titlebar drag-region">
            <!-- <img src="../../assets/blog/blog.svg" alt="POETIZE" class="logo"> -->
            <h2 class="drag-area AwesomeFont blog-headerfont">NTauri</h2>
        </div>
        <nav class="header-nav blog-headerfont">
            <div class="blog-header-btn" @click="goRouter('/blog')">
                🏡 <span>首页</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/喜欢')">
                ❤️ <span>喜欢</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/随笔')">
                💬 <span>随笔</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/记录')">
                📸 <span>记录</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/treasurechest')">
                🧰 <span>百宝箱</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/blog/leavemessage')">
                🌏 <span>留言</span>
            </div>
            <div class="blog-header-btn" @click="goRouter('/联系我')">
                👤 <span>联系我</span>
            </div>
        </nav>
        <div class="header-right blog-headerfont">
            <n-button @click="gologin" class="login-btn blog-header-btn" >
                登录
            </n-button>
        </div>
    </header>
</template>



<style scoped>
@import '@/assets/blog/blogfont.css';

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

.drag-area{
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
    color: #FFD700; /* 鼠标悬停时变成金黄色 */
}
</style>