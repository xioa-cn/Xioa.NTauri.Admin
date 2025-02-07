<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    router.push('/');
}
</script>

<template>
    <div @click="handleLogout">
        footer
    </div>
</template>