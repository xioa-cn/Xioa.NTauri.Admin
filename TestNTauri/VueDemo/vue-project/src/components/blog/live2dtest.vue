<template>
    <div class="live2d-container">
        <canvas  ref="canvasRef"></canvas>
        <!-- 气泡框 -->
        <div class="message-bubble" v-if="showMessage">
            {{ currentMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { Live2DModel } from 'pixi-live2d-display'
import { useLive2dState } from '@/stores/live2dstore'
(window as any).PIXI = PIXI

const live2dstore = useLive2dState()
const canvasRef = ref<HTMLCanvasElement | null>(null)
let app: Application
let model: any
let cleanup: (() => void) | null = null

// 确保这些状态在这里定义
const currentMessage = ref('')
const bubbleStyle = ref({})
const showMessage = ref(false)
let hideMessageTimer: number | null = null  // 添加计时器变量

// 消息列表
const messages = {
    tap: ['别戳我啦！', '痒痒的~', '你在干什么呀？'],
    idle: ['好无聊啊...', '主人最近在干什么呢？'],
    flic: ['哼哼~', '看我可爱吗？', '今天天气真好呢~']
}

// 显示消息的函数
const showMessageBubble = (text: string, duration = 3000) => {
    console.log('Showing message:', text)

    // 如果存在之前的计时器，清除它
    if (hideMessageTimer) {
        clearTimeout(hideMessageTimer)
        hideMessageTimer = null
    }

    // 显示新消息
    currentMessage.value = text
    showMessage.value = true

    // 设置新的计时器
    hideMessageTimer = window.setTimeout(() => {
        showMessage.value = false
        hideMessageTimer = null
    }, duration)
}

onBeforeUnmount(() => {
    if (hideMessageTimer) {
        clearTimeout(hideMessageTimer)
    }
    if (cleanup) {
        console.log('cleanup-2d')
        cleanup()
    }
})

onMounted(async () => {
    if (!canvasRef.value) return

    app = new Application({
        view: canvasRef.value,
        width: 350,
        height: 350,
        backgroundColor: 0x00000000,
        antialias: true,
        transparent: true,
        resolution: window.devicePixelRatio,
        autoDensity: true,
    })

    try {
        model = await Live2DModel.from('/l2/miara_pro_t03.model3.json')
        app.stage.addChild(model)

        model.anchor.set(1.0, 0.5)
        model.scale.set(0.1)
        const centerX = app.screen.width / 2
        const centerY = app.screen.height / 2
        model.position.set(centerX, centerY)

        // 添加点击事件
        model.on('pointerdown', async () => {
            console.log('Model clicked')  // 添加调试日志
            await model.motion('Tap')
            // 随机选择一条点击消息
            const randomMessage = messages.tap[Math.floor(Math.random() * messages.tap.length)]
            showMessageBubble(randomMessage)
        })

        // 播放初始动作并显示欢迎消息
        model.motion('Idle')
        console.log(live2dstore.live2d)
        if (live2dstore.live2d) {
            showMessageBubble('欢迎来到我的博客！')
            live2dstore.live2d = false
        }
        cleanup = () => {
            if (app) {
                app.destroy(true)
            }
        }

    } catch (error) {
        console.error('Failed to load Live2D model:', error)
    }
})
</script>

<style scoped>
.live2d-container {
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    background: transparent;
    background-color: transparent;
    width: 350px;
    height: 350px;
    bottom: -140px;
    right: -95px;
}

.live2d-container canvas {
    position: absolute;
    right: 0;
    bottom: 0;
    pointer-events: auto;
    background: transparent;
}

.message-bubble {
    position: absolute;
    bottom: 90%;
    right: 40%;
    transform: translateX(-50%);
    background: #FFD700;
    /* 金色背景 */
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-width: 200px;
    pointer-events: none;
    animation: fadeIn 0.3s ease-out;
    z-index: 1001;
    color: #8B4513;
    /* 深棕色文字，更容易阅读 */
    font-size: 14px;
    letter-spacing: 1px;
    border: 2px solid rgba(218, 165, 32, 0.6);
    /* 半透明金色边框 */
}

.message-bubble::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: #FFD700 transparent transparent transparent;
    /* 金色箭头 */
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(10px);
        /* 从下往上的动画 */
    }

    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
</style>