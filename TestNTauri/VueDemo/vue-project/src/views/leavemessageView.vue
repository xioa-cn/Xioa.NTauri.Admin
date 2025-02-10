<template>
    <div class="message-board" :style="{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }">
        <!-- 留言输入区 -->
        <div class="message-input-container" >
            <input v-model="messageText" class="message-input" placeholder="写下点什么..." @keyup.enter="submitMessage" />
            <button class="submit-btn" :disabled="!messageText.trim()" @click="submitMessage">
                发送!
            </button>
        </div>

        <!-- 弹幕区域 -->
        <div class="danmaku-container" ref="danmakuContainer">
            <TransitionGroup name="danmaku">
                <div v-for="msg in messages" :key="msg.id" class="danmaku-item" :style="getDanmakuStyle(msg)">
                    <img :src="msg.avatar" class="avatar" alt="avatar" />
                    <span class="message-text">{{ msg.content }}</span>
                </div>
            </TransitionGroup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useChangeBannerStore } from '@/hooks/useChangeBannerStore'
import type { LeaveMessage } from '@/types/leavemessage'
import { leaveMessages } from '@/utils/testLeaveMessage'
import { useRandomImg } from '@/hooks/useRandomImg';

const { backgroundImage, refreshBackground } = useRandomImg();



const { changeBannerStore } = useChangeBannerStore()
const messageText = ref('')
const messages = ref<LeaveMessage[]>(leaveMessages)
const danmakuContainer = ref<HTMLElement | null>(null)


// 生成随机高度
const getRandomTop = () => {
    const containerHeight = danmakuContainer.value?.clientHeight || 500
    return Math.random() * (containerHeight - 40) // 40是弹幕高度
}


// 生成随机动画时长
const getRandomDuration = () => {
    return 8 + Math.random() * 4 // 8-12秒
}

// 获取弹幕样式
const getDanmakuStyle = (msg: LeaveMessage) => {
    return {
        top: `${msg.top}px`,
        animationDuration: `${msg.duration}s`
    }
}

// 提交留言
const submitMessage = () => {
    if (!messageText.value.trim()) return

    const newMessage: LeaveMessage = {
        id: Date.now(),
        content: messageText.value,
        avatar: '/0.jpg',
        top: getRandomTop(),
        duration: getRandomDuration(),
        username: '匿名',
        date: new Date().toLocaleString()
    }


    messages.value.push(newMessage)
    messageText.value = ''

    // 自动移除消息
    setTimeout(() => {
        const index = messages.value.findIndex(msg => msg.id === newMessage.id)
        if (index !== -1) {
            messages.value.splice(index, 1)
        }
    }, (newMessage.duration ?? 10) * 1000)
}
messages.value.forEach(msg => {
    msg.top = getRandomTop()
    msg.duration = getRandomDuration()
    setTimeout(() => {
        const index = messages.value.findIndex(msg => msg.id === msg.id)
        if (index !== -1) {
            messages.value.splice(index, 1)
        }
    }, (msg.duration ?? 10) * 1000)
})
onMounted(() => {
    refreshBackground()
    changeBannerStore(false)
})
</script>

<style scoped>
.message-board {
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    position: relative;
    overflow: hidden;
}

.message-input-container {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 100;
    padding: 20px;
}

.message-input {
    width: 300px;
    padding: 10px 16px;
    border: none;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.9);
    outline: none;
    font-size: 14px;
}

.submit-btn {
    padding: 0 20px;
    border: none;
    border-radius: 20px;
    background: #ffd700;
    color: #000;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    background: #fcc419;
}

.submit-btn:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.danmaku-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.danmaku-item {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    white-space: nowrap;
    animation: danmaku linear;
    transform: translateX(100vw);
}

.avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
}

.message-text {
    color: #000;
    font-size: 14px;
}

@keyframes danmaku {
    from {
        transform: translateX(100vw);
    }

    to {
        transform: translateX(-100%);
    }
}

.danmaku-enter-active {
    animation: danmaku linear;
}

.danmaku-leave-active {
    position: absolute;
}

.danmaku-enter-from,
.danmaku-leave-to {
    opacity: 0;
}
</style>
