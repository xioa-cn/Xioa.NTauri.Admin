<template>
    <div class="live2d-container">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Application } from 'pixi.js'
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
Live2DModel.registerTicker(Ticker);
const app = new PIXI.Application({ view: document.getElementById('canvas') });
document.body.appendChild(app.view);
 
(async function loadModel() {
  const model = await Live2DModel.from('/l2/miara_pro_t03.model3.json');
  app.stage.addChild(model);
})();


</script>

<style scoped>
.live2d-container {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1000;
    pointer-events: none;
}

.live2d-container canvas {
    pointer-events: auto;
}
</style>