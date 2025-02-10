<script setup lang="ts">
import FastCard from '@/components/blog/fastcard.tsx'
import { posts } from '@/utils/testfastblogpost'
import { useLookBlog } from '@/hooks/uselookblog';

const { goBlogContent } = useLookBlog()

</script>
<template>
    <div class="blog-list">
        <FastCard v-for="(post, index) in posts" @click="goBlogContent(post.id)" :key="post.id" :post="post" :index="index" />
    </div>
</template>


<style scoped>
.blog-list {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}
</style>
