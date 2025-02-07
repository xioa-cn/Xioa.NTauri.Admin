<script setup lang="ts">
import LoginForm from '@/components/login/LoginForm.vue';

</script>

<template>
    <div class="login-container">
        <div class="login-float titlebar drag-region"></div>
        <LoginForm />
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: url('@/assets/9.jpg');
    background-size: cover;
    background-position: center;
    z-index: 1000;
}

.login-float {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 32px;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-app-region: drag;
    z-index: 1001;
}

</style>