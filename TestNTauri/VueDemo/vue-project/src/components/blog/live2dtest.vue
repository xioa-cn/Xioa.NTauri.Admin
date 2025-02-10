<template>
    <div class="live2d-container">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js'
import { Live2DModel } from 'pixi-live2d-display'

(window as any).PIXI = PIXI

const canvasRef = ref<HTMLCanvasElement | null>(null)
let app: Application
let model: any

onMounted(async () => {
    if (!canvasRef.value) return

    app = new Application({
        view: canvasRef.value,
        width: 500,
        height: 500,
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

        document.addEventListener('mousemove', handleMouseMove)

        // 确保在组件卸载时移除事件监听
        onBeforeUnmount(() => {
            document.removeEventListener('mousemove', handleMouseMove)
            if (app) {
                app.destroy(true)
            }
        })

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
    right: 20px;
    bottom: 20px;
    z-index: 1000;
    pointer-events: none;
    background: transparent;
}

.live2d-container canvas {
    pointer-events: auto;
    background: transparent;
    /* border: 1px solid red; */  /* 如果需要调试可以取消注释 */
}
</style>