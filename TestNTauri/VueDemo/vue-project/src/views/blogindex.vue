<script setup lang="ts">
import BlogIndexLeftCard from '@/components/blog/blogIndexLeftCard.vue'
import BlogIndexRightCard from '@/components/blog/blogIndexRightCard.vue'
</script>

<template>
    <div class="blog-index">
        <div class="left-card">
            <blog-index-left-card />
        </div>
        <div class="right-card">
           <blog-index-right-card />
        </div>
    </div>
</template>

<style scoped>
.blog-index {
    display: flex;
    
   
}
.left-card{
    width: 300px;
}
.right-card{
    width: calc(100vw - 300px);
}
</style>

