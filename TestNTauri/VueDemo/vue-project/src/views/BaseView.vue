<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useAppStore } from '@/stores/appstore';
import { NElement } from 'naive-ui';

const appStore = useAppStore();

// 处理滚动条的方法
const beforeEnter = () => {
    document.documentElement.style.overflow = 'hidden';
};

const afterEnter = () => {
    document.documentElement.style.overflow = '';
};
</script>

<template>
    <RouterView #default="{ Component, route }">
        <n-element class="router-container">
            <transition
                :name="appStore.routerTransition ? 'smooth-fade' : ''"
                mode="out-in"
                appear
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
            >
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
    background: #ffffff; /* 或者使用你的主题色变量 */
}

/* 页面内容容器 */
.page-content {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100vh;
    will-change: transform, opacity;
    background: inherit; /* 继承父级背景色 */
}

/* 更自然的淡入淡出+缩放动画 */
.smooth-fade-enter-active,
.smooth-fade-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    width: 100%;
    top: 0;
    background: inherit; /* 添加背景继承 */
}

.smooth-fade-enter-from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
}

.smooth-fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.smooth-fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.smooth-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px) scale(0.98);
}

/* 优化滚动条样式 */
:deep() ::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

:deep() ::-webkit-scrollbar-thumb {
    background-color: rgba(128, 128, 128, 0.3);
    border-radius: 3px;
    transition: background-color 0.2s;
}

:deep() ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(128, 128, 128, 0.5);
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
