<script setup lang="ts">
import { NButton } from 'naive-ui'
import BlogIndexLeftRecommend from '@/components/blog/blogIndexLeftRecommend.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goView = (path: string) => {
    router.push(path)
}

</script>

<template>


    <div class="card-container">
        <div class="blog-info-card">
            <div class="avatar-container">
                <img src="/header.jpg" alt="blog avatar" class="avatar">
            </div>
            <div class="blog-title">XIOA</div>
            <div class="blog-stats">
                <div class="stat-item">
                    <div class="stat-label">文章</div>
                    <div class="stat-value">94</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">分类</div>
                    <div class="stat-value">6</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">访问量</div>
                    <div class="stat-value">137317</div>
                </div>
            </div>
            <n-button class="follow-btn" type="success">关注园主</n-button>
        </div>

        <blog-index-left-recommend />
        
        <div class="card poetize" @click="goView('/blog/ha-fastbrowsing')">
            <div class="card-title">速览</div>
            <div class="card-content">开发技术</div>
            <div class="card-subtitle">博客</div>
        </div>

        <div class="card life">
            <div class="card-title">速览</div>
            <div class="card-content">资源共享</div>
            <div class="card-subtitle">博客</div>
        </div>

        <div class="card video">
            <div class="card-title">速览</div>
            <div class="card-content">生活倒影</div>
            <div class="card-subtitle">博客</div>
        </div>

        <div class="card resource">
            <div class="card-title">速览</div>
            <div class="card-content">阅读</div>
            <div class="card-subtitle">博客</div>
        </div>
    </div>
</template>

<style scoped>
.card-container {
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 16px;
}

.blog-info-card {
    background: linear-gradient(135deg, #e0e7ff 0%, #93c5fd 100%);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
}

.avatar-container {
    width: 80px;
    height: 80px;
    margin: 0 auto 16px;
    background: white;
    border-radius: 50%;
    padding: 4px;
}

.avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.blog-title {
    font-size: 24px;
    font-weight: bold;
    color: #1e293b;
    margin-bottom: 16px;
}

.blog-stats {
    display: flex;
    justify-content: space-around;
    margin-bottom: 16px;
}

.stat-item {
    text-align: center;
}

.stat-label {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 4px;
}

.stat-value {
    font-size: 18px;
    font-weight: bold;
    color: #1e293b;
}

.follow-btn {
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 6px;
    background: #3b82f6;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.follow-btn:hover {
    background: #2563eb;
}

.card {
    padding: 20px;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateX(10px);
}

.card-title {
    font-size: 14px;
    opacity: 0.9;
}

.card-content {
    font-size: 24px;
    font-weight: bold;
    margin: 8px 0;
}

.card-subtitle {
    font-size: 14px;
    opacity: 0.8;
}

.poetize {
    background: linear-gradient(to right, #00c6fb, #005bea);
}

.life {
    background: linear-gradient(to right, #00f2fe, #1fa);
}

.video {
    background: linear-gradient(to right, #ff8a00, #da1b60);
}

.resource {
    background: linear-gradient(to right, #ff3e9d, #ff0f7b);
}
</style>