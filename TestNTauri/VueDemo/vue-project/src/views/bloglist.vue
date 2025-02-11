<script setup lang="ts">
import BlogListHeader from '@/components/blog/bloglistheader.tsx'
import { useRoute } from "vue-router"
import { ref, onMounted } from "vue"
import { useRouteToTitle } from '@/hooks/useRouteToTitle'

const route = useRoute();
const title = ref<string>('')
const { toTitleString } = useRouteToTitle()

onMounted(() => {
    title.value = toTitleString(route.query.key as string)
})

</script>

<template>
    <div class="blog-list-container">
        <BlogListHeader :title="title" />
    </div>
</template>

<style scoped>
.blog-list-container {
    margin-top: 70px;
}
</style>
