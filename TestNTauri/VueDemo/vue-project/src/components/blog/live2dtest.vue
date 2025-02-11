<template>
    <div class="live2d-container">
        <canvas ref="canvasRef"></canvas>
        <!-- 添加气泡框 -->
        <div class="message-bubble" v-if="showMessage" :style="bubbleStyle">
            {{ currentMessage }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { Live2DModel } from 'pixi-live2d-display'
const currentMessage = ref('')
const bubbleStyle = ref({})
const showMessage = ref(false)
// 消息列表
const messages = {
    tap: ['别戳我啦！', '痒痒的~', '你在干什么呀？'],
    idle: ['好无聊啊...', '主人最近在干什么呢？'],
    flic: ['哼哼~', '看我可爱吗？', '今天天气真好呢~']
}
// 显示消息的函数
const showMessageBubble = (text: string, duration = 3000) => {
    currentMessage.value = text
    showMessage.value = true

    // duration 毫秒后隐藏消息
    setTimeout(() => {
        showMessage.value = false
    }, duration)
}

window.PIXI = PIXI


const canvasRef = ref<HTMLCanvasElement | null>(null)
let app: Application
let model: any
// 设置清理函数
const cleanup = () => {
    if (app) {
        app.destroy(true)
    }
}

onBeforeUnmount(() => {
    cleanup();
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

        // 先设置锚点
        model.anchor.set(0.5, 0.5)

        // 然后设置缩放
        model.scale.set(0.1)

        // 最后设置位置
        const centerX = app.screen.width / 2
        const centerY = app.screen.height / 2
        model.position.set(centerX, centerY)

        // 修改鼠标跟踪逻辑
        const handleMouseMove = (e: MouseEvent) => {
            if (!model || !canvasRef.value) return

            // 获取画布位置
            const rect = canvasRef.value.getBoundingClientRect()

            // 计算相对于画布的鼠标位置（-0.5 到 0.5 之间）
            const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
            const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2

            // 应用视角变化
            model.internalModel.focusController.focus(mouseX, mouseY)
        }
        // 添加点击事件
        model.on('pointerdown', async () => {
            console.log('Playing Tap motion')
            await model.motion('Tap')
            // 随机选择一条点击消息
            const randomMessage = messages.tap[Math.floor(Math.random() * messages.tap.length)]
            showMessageBubble(randomMessage)
        })
        showMessageBubble('欢迎来到我的博客！')
        document.addEventListener('mousemove', handleMouseMove)
        // 播放初始的空闲动作
        model.motion('Idle')


        // 定时播放轻弹动作
        setInterval(async () => {
            // 30% 的概率触发
            if (Math.random() < 0.3) {
                console.log('Playing Flic motion')
                await model.motion('Flic')
                const randomMessage = messages.flic[Math.floor(Math.random() * messages.flic.length)]
                showMessageBubble(randomMessage)
            }
        }, 5000)  // 每5秒检查一次


        // 打印位置信息以便调试
        console.log('Canvas size:', app.screen.width, app.screen.height)
        console.log('Model position:', model.position.x, model.position.y)
        console.log('Model anchor:', model.anchor.x, model.anchor.y)
        console.log('Model scale:', model.scale.x, model.scale.y)

    } catch (error) {
        console.error('Failed to load Live2D model:', error)
    }
})
</script>

<style scoped>
.live2d-container {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1000;
    pointer-events: none;
    background: transparent;
    width: 350px;
    height: 350px;
    margin-bottom: -20px;
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
  right: 100%;  /* 位于模型左侧 */
  bottom: 50%;
  transform: translateY(50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  margin-right: 20px;
  pointer-events: none;
  animation: fadeIn 0.3s ease-out;
}

.message-bubble::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent transparent rgba(255, 255, 255, 0.9);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(50%) translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(50%) translateX(0);
  }
}

</style>