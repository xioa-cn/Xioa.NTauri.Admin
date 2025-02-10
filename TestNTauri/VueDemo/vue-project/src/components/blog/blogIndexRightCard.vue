<script setup lang="ts">
import { NButton } from 'naive-ui'
import blogIndexRightContent from './blogIndexRightContent.vue'
</script>

<template>
    <div class="right-layout">
        <div class="header">
            <div class="header-left">           
                <div class="logo-text">XIOA-BLOG</div>
            </div>
            <div class="header-right">
                <n-button quaternary round type="success">
                    MORE
                </n-button>
            </div>
        </div>
        <div class="content">
            <blog-index-right-content />
        </div>
    </div>
</template>

<style scoped>
.right-layout {
    width: calc(100vw - 320px);
    margin-top: 16px;
    padding: 16px;
    background: #fff;
}

.header {
    height: 64px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 32px;
    height: 32px;
}

.logo-icon img {
    width: 100%;
    height: 100%;
}

.logo-text {
    font-size: 20px;
    font-weight: 600;
    color: #ff7d00;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}

.menu-btn {
    padding: 4px;
}

.menu-btn:hover {
    background: rgba(0, 0, 0, 0.06);
}

.more-btn {
    font-size: 14px;
    font-weight: 500;
    color: #18a058;
    cursor: pointer;
    padding: 6px 12px;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.more-btn:hover {
    background: rgba(24, 160, 88, 0.1);
}

.content {
    padding: 24px;
}
</style>