<template>
  <div class="flow-container">
    <div class="toolbar">
      <button @click="addRect">添加矩形</button>
      <button @click="addCircle">添加圆形</button>
    </div>
    <div id="container" class="graph-container"></div>
  </div>
</template>

<script setup>
import { Graph, Shape } from '@antv/x6'
import { onMounted } from 'vue'

let graph

onMounted(() => {
  // 初始化画布
  graph = new Graph({
    container: document.getElementById('container'),
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: true,
      highlight: true,
      connector: 'smooth',
      connectionPoint: 'boundary',
    },
  })

  // 允许拖拽
  graph.enablePanning()
})

// 添加矩形节点
const addRect = () => {
  const rect = new Shape.Rect({
    width: 100,
    height: 40,
    attrs: {
      body: {
        fill: '#fff',
        stroke: '#5F95FF',
        strokeWidth: 1,
      },
      label: {
        text: '矩形节点',
        fill: '#333',
      },
    },
  })

  rect.position(50, 50)
  graph.addNode(rect)
}

// 添加圆形节点
const addCircle = () => {
  const circle = new Shape.Circle({
    width: 60,
    height: 60,
    attrs: {
      body: {
        fill: '#fff',
        stroke: '#5F95FF',
        strokeWidth: 1,
      },
      label: {
        text: '圆形节点',
        fill: '#333',
      },
    },
  })

  circle.position(200, 50)
  graph.addNode(circle)
}
</script>

<style scoped>
.flow-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.toolbar {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.toolbar button {
  margin-right: 8px;
  padding: 4px 8px;
}

.graph-container {
  flex: 1;
  background-color: #f5f5f5;
  min-height: 600px;
}
</style>
