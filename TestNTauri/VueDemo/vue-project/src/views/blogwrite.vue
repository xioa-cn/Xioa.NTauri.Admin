<script setup lang="ts">
import blogwritetitle from '@/components/blog/blogwritetitle';
const handleInsertCode = () => {
    // 处理插入代码块
}

const handleInsertImage = () => {
    // 处理插入图片
}

const handleInsertText = () => {
    // 处理插入文本
}

const handleInsertWarning = () => {
    // 处理插入警告框
}

const handleInsertInfo = () => {
    // 处理插入信息框
}

const handleInsertLink = () => {
    // 处理插入链接
}

const handleInsertList = () => {
    // 处理插入列表
}
</script>

<template>
    <div class="blog-write-container">
        <div class="blog-write-title">
            <blogwritetitle :onInsertCode="handleInsertCode" :onInsertImage="handleInsertImage"
                :onInsertText="handleInsertText" :onInsertWarning="handleInsertWarning" :onInsertInfo="handleInsertInfo"
                :onInsertLink="handleInsertLink" :onInsertList="handleInsertList" />
        </div>

        <div class="blog-write-content">
            <div class="blog-write-content-left">

            </div>
            <div class="blog-write-content-right">

            </div>
        </div>
    </div>
</template>

<style scoped>
.blog-write-content{
    margin-top: 0px;
    height: 100vh;
    background-color: red;
}

.blog-write-container {
    width: 100vw;
    height: 100vh;
}

.blog-write-title {
    margin-top: 60px;
    width: 100vw;
    height: 40px;
    background-color: var(--primary-color);
}
</style>