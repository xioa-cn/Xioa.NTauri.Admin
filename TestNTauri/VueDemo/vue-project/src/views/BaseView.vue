<script setup lang="ts">
import { RouterView, type RouteLocationNormalizedLoaded } from 'vue-router';
import { useAppStore } from '@/stores/appstore';
import { NElement } from 'naive-ui';
import { ref, computed } from 'vue'
import { useRandomImg } from '@/hooks/useRandomImg';
const appStore = useAppStore();

// 背景图片路径
const backgroundImage = ref('/9.jpg')

// 计算样式
const containerStyle = computed(() => ({
    '--background-router-image': `url(${backgroundImage.value})`
}))

// 动态改变背景图片
const changeBackground = (newPath: string) => {
    backgroundImage.value = newPath
}

// 处理滚动条的方法
const beforeEnter = () => {
    document.documentElement.style.overflow = 'hidden';
};
const { getRandomBackground } = useRandomImg()
const afterEnter = () => {
    document.documentElement.style.overflow = '';
};

const shouldAnimate = (route: RouteLocationNormalizedLoaded) => {
    changeBackground(getRandomBackground()); 
    // 只有一级路由才有动画
    //return appStore.routerTransition && route.matched.length === 1;
    return true;
    // 或者通过路径判断
    // return appStore.routerTransition && !route.path.includes('/blog/');
};
</script>

<template>
    <RouterView #default="{ Component, route }">
        <n-element class="router-container" :style="containerStyle">
            <transition :name="shouldAnimate(route) ? 'space-tunnel' : ''" mode="out-in" appear
                @before-enter="beforeEnter" @after-enter="afterEnter">
                <component :is="Component" :key="route.path" class="page-content" />
            </transition>
        </n-element>
    </RouterView>
</template>

<style scoped>
/* 优化后的动画容器 */
.router-container {
    position: relative;
    min-height: 100vh;
    width: 100vw;
    overflow: hidden;
    perspective: 2000px;
    background: #000;
}

/* 修改背景图片样式 */
.router-container::after {
    content: '';
    position: fixed;
    top: -20px;
    left: -20px;
    width: calc(100% + 40px);
    height: calc(100% + 40px);
    background-image: var(--background-router-image);
    background-size: cover;
    background-position: center;
    opacity: 0.3;  /* 增加不透明度 */
    z-index: -2;
    filter: blur(4px) brightness(0.8) contrast(1.1);  /* 减少模糊，调整亮度和对比度 */
    transform: scale(1.1);
    animation: slowZoom 20s ease-in-out infinite alternate;
}

@keyframes slowZoom {
    from {
        transform: scale(1.1);
    }
    to {
        transform: scale(1.15);  /* 减小缩放范围以保持清晰度 */
    }
}

/* 页面内容容器 */
.page-content {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
    will-change: transform, opacity;
    background: inherit;
}

/* 时空隧道动画 */
.space-tunnel-enter-active,
.space-tunnel-leave-active {
    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    position: absolute;
    width: 100%;
    transform-style: preserve-3d;
}

.space-tunnel-enter-from {
    opacity: 0;
    transform: scale(2) translateZ(-2000px);
}

.space-tunnel-enter-to {
    opacity: 1;
    transform: scale(1) translateZ(0);
}

.space-tunnel-leave-from {
    opacity: 1;
    transform: scale(1) translateZ(0);
}

.space-tunnel-leave-to {
    opacity: 0;
    transform: scale(0.5) translateZ(2000px);
}

/* 多彩光线效果 */
.router-container::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300vmax;
    height: 300vmax;
    transform: translate(-50%, -50%);
    background:
        repeating-radial-gradient(circle at center,
            transparent 0,
            transparent 40px,
            rgba(255, 0, 0, 0.2) 41px,
            transparent 42px,
            transparent 80px),
        repeating-radial-gradient(circle at center,
            transparent 0,
            transparent 30px,
            rgba(0, 255, 0, 0.2) 31px,
            transparent 32px,
            transparent 60px),
        repeating-radial-gradient(circle at center,
            transparent 0,
            transparent 50px,
            rgba(0, 0, 255, 0.2) 51px,
            transparent 52px,
            transparent 100px),
        repeating-radial-gradient(circle at center,
            transparent 0,
            transparent 60px,
            rgba(255, 255, 0, 0.2) 61px,
            transparent 62px,
            transparent 120px),
        radial-gradient(circle at center,
            rgba(0, 150, 255, 0.1) 0%,
            rgba(0, 0, 50, 0.2) 40%,
            rgba(0, 0, 20, 0.6) 65%,
            rgba(0, 0, 10, 0.9) 90%);
    pointer-events: none;
    z-index: -1;
    animation: warpSpeed 2s linear infinite;
    mix-blend-mode: screen;
}

@keyframes warpSpeed {
    from {
        transform: translate(-50%, -50%) scale(1);
    }

    to {
        transform: translate(-50%, -50%) scale(0.2);
        /* 调整缩放范围 */
    }
}

/* 优化滚动条样式 */
:deep() ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

:deep() ::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.3);
    border-radius: 3px;
}

.flip-enter-active,
.flip-leave-active {
    transition: all 0.6s;
    transform-style: preserve-3d;
    perspective: 1000px;
}

.flip-enter-from {
    opacity: 0;
    transform: rotateY(90deg);
}

.flip-leave-to {
    opacity: 0;
    transform: rotateY(-90deg);
}
</style>
