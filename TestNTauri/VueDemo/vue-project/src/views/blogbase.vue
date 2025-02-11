<script setup lang="ts">
import BlogHeader from '@/components/blog/blogheader.vue'
import { ref, watchEffect } from 'vue'
import { useblogHeaderText } from '@/hooks/useblogHeaderText'
import { onMounted } from 'vue'
import { NButton, NIcon, NBackTop } from 'naive-ui'
import {
    ChevronUpOutline,
    HomeOutline,
    CloseOutline,
    RepeatOutline, RemoveOutline
} from '@vicons/ionicons5'
import { useWebViewWindow } from '@/hooks/useWebViewWindow';
import { useblogIndexGoHome } from '@/hooks/useblogIndexGoHome';
import { useNoneUserToLogin } from "@/hooks/useNoneUserToLogin.ts";
import { type RouteLocationNormalizedLoaded } from 'vue-router';
import live2dtest from '@/components/blog/live2dtest.vue'
import blogfooter from '@/components/blog/blogfooter.vue'

const { getText } = useblogHeaderText()
const text = ref<string>('')
const showActions = ref(false)
const { goHome } = useblogIndexGoHome()

const { isCanReader } = useNoneUserToLogin()
// 本地状态
const localBanner = ref<boolean>(true)

onMounted(() => {
    text.value = getText();
    isCanReader();
})
function shouldAnimate(route: RouteLocationNormalizedLoaded) {
    console.log(route.path)
    if (route.path === '/blog' || route.path.includes('/blog/content')
        || route.path.includes('/blog/ha-')) {
        localBanner.value = true
        return true
    } else {
        localBanner.value = false
        return true
    }

}
const { handleMinimize, handleMaximize, handleClose } = useWebViewWindow();
const toggleActions = () => {
    showActions.value = !showActions.value
}

</script>
<template>
    <div class="base-layout">
        <BlogHeader />
        <main class="main-content">
            <div class="blog-container">
                <!-- Banner区域 -->
                <div v-if="localBanner" class="banner-container">
                    <div class="banner-content">
                        <h1 class="banner-title AwesomeFont">开摆</h1>
                        <div class="banner-text-wrapper">
                            <div class="banner-subtitle-container">
                                <p class="banner-subtitle">{{ text }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="banner-overlay"></div>
                    <img src="../assets/blog/blog.jpg" alt="banner" class="banner-image">
                </div>

                <router-view v-slot="{ Component, route }">
                    <transition :name="shouldAnimate(route) ? 'smooth-fade' : ''" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>

                <blogfooter v-if="localBanner"/>
            </div>
        </main>
        <div class="wave-container">
            <KeepAlive>
                <live2dtest />
            </KeepAlive> 
        </div>

        <!-- 添加固钉按钮组 -->
        <div class="float-buttons" :class="{ 'show-actions': showActions }">
            <div class="action-buttons" v-show="showActions">
                <n-button @click="goHome" circle type="info" class="action-btn">
                    <template #icon>
                        <n-icon>
                            <HomeOutline />
                        </n-icon>
                    </template>
                </n-button>

                <n-button @click="handleMinimize" circle color="#8a2be2" class="action-btn">
                    <template #icon>
                        <n-icon>
                            <RemoveOutline />
                        </n-icon>
                    </template>
                </n-button>

                <n-button @click="handleMaximize" circle type="warning" class="action-btn">
                    <template #icon>
                        <n-icon>
                            <RepeatOutline />
                        </n-icon>
                    </template>
                </n-button>

                <n-button @click="handleClose" circle type="error" class="action-btn">
                    <template #icon>
                        <n-icon>
                            <CloseOutline />
                        </n-icon>
                    </template>
                </n-button>
            </div>

            <n-button circle type="primary" class="toggle-btn" @click="toggleActions">
                <template #icon>
                    <n-icon>
                        <ChevronUpOutline />
                    </n-icon>
                </template>
            </n-button>

        </div>
    </div>
</template>

<style scoped>
.base-layout {
    min-height: 100vh;
    background: #f5f5f5;
    overflow: hidden;
}

.main-content {
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

/* Chrome, Safari and Opera */
.main-content::-webkit-scrollbar {
    display: none;
}

.banner-title {
    font-weight: bold;
    font-size: 48px;
}

.banner-subtitle {
    font-size: 24px;
    font-weight: bold;
    width: 0;
    margin: 0;
    position: relative;
    animation: content-slide-in 4s steps(14) infinite;
    overflow: hidden;
    white-space: nowrap;
}

.banner-subtitle::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    height: 24px;
    transform: translateY(-50%);
    animation: cursor-blink 0.5s steps(2) infinite;
}

@keyframes content-slide-in {
    0% {
        width: 0;
    }

    50%,
    100% {
        width: 27ch;
    }
}

@keyframes cursor-blink {
    from {
        border-right: 2px solid transparent;
    }

    to {
        border-right: 2px solid #fff;
    }
}

.banner-text-wrapper {
    text-align: center;
    width: 100%;
}

.banner-subtitle-container {
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    border-radius: 8px;
    width: max-content;
    margin: 0 auto;
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
<style scoped>
.blog-container {
    min-height: 100vh;
}

.banner-container {
    position: relative;
    height: 400px;
    overflow: hidden;
}

.banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));
}

.banner-content {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    z-index: 1;
}

.content-container {
    max-width: 1200px;
    margin: -50px auto 0;
    padding: 0 24px;
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 24px;
}
</style>
<style scoped>
.wave-container {
    position: absolute;
    right: 0;
    height: 100px;
    width: 100%;
    
    overflow: hidden;
}




</style>
<style scoped>
.float-buttons {
    position: fixed;
    right: 40px;
    bottom: 40px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

.show-actions .action-buttons {
    opacity: 1;
    transform: translateY(0);
}

.action-btn {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.toggle-btn {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
}

.show-actions .toggle-btn {
    transform: rotate(180deg);
}
</style>