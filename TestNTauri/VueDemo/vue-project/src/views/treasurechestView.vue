<script setup lang="ts">
import TreasureChestHeader from '@/components/blog/treasurechestheader.tsx'
import { ref, onMounted } from 'vue'
import { useRoot} from '@/hooks/useRoot'
const text = ref('')
const root = useRoot()
onMounted(() => {
    if (root.value) {
        text.value = '这是一个 Vue3 与 WPF 结合的~'
    }else{
        text.value = '这是一个 Vue3 与 Asp.net Core 结合的~'
    }
})

</script>
<template>
    <div class="treasurechest-container">
        <TreasureChestHeader />
        <div class="content-section">
            <!-- 本站信息 -->
            <div class="info-section">
                <h2 class="section-title">
                    <span class="icon">🌸</span>
                    本站信息
                </h2>
                <div class="info-content">
                    <div class="info-item">
                        <span class="label">网站名称:</span>
                        <span class="value">XIOA</span>
                    </div>
                    <div class="info-item">
                        <span class="label">网址:</span>
                        <a href="#" target="_blank" class="value link">https://#</a>
                    </div>
                    <div class="info-item">
                        <span class="label">头像:</span>
                        <img src="/header.jpg" alt="头像" class="avatar" />
                    </div>
                    <div class="info-item">
                        <span class="label">描述:</span>
                        <span class="value">{{ text }}</span>
                    </div>

                </div>
            </div>

            <!-- 获取源码 -->
            <div class="info-section">
                <h2 class="section-title">
                    <span class="icon">🌸</span>
                    获取源码
                </h2>
                <div class="apply-content">
                    <p class="apply-item">点击上方信封 ✨✨✨</p>
                    <p class="apply-item"> ❌❌❌</p>
                    <p class="apply-item"> 📝📝📝</p>
                </div>
            </div>

            <!-- 分隔线 -->
            <div class="divider">
                <span class="divider-icon">❄️</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.treasurechest-container {
    margin: 70px auto 0;
    /* 上边距70px，左右auto实现居中，下边距0 */
    width: 70vw;
    max-width: 1200px;
    /* 添加最大宽度限制 */
}

.content-section {
    margin-top: 24px;
}

.info-section {
    background: #fff;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.icon {
    font-size: 24px;
}

.info-content {
    background: #fef6f6;
    padding: 20px;
    border-radius: 8px;
}

.info-item {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.label {
    color: #666;
    min-width: 80px;
}

.value {
    color: #333;
}

.link {
    color: #007bff;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.cover-image {
    max-width: 200px;
    border-radius: 8px;
}

.apply-content {
    background: #fef6f6;
    padding: 20px;
    border-radius: 8px;
}

.apply-item {
    margin-bottom: 12px;
    color: #666;
}

.divider {
    text-align: center;
    margin: 32px 0;
    position: relative;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    border-top: 2px dashed #e8e8e8;
}

.divider-icon {
    position: relative;
    background: transparent;
    padding: 0 16px;
    font-size: 20px;
}
</style>
