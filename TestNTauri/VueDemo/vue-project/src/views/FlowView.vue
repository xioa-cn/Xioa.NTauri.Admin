<template>
  <div id="flow" ref="container"></div>
</template>

<script setup lang="ts">
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement>()

onMounted(() => {
  const lf = new LogicFlow({
    container: container.value as HTMLElement,
    grid: true,
    height: 600,
    width: 800,
  })
  
  // 初始化数据
  lf.render({
    nodes: [
      {
        id: '1',
        type: 'rect',
        x: 100,
        y: 100,
        text: '开始'
      },
      {
        id: '2',
        type: 'rect',
        x: 300,
        y: 100,
        text: '流程'
      }
    ],
    edges: [
      {
        sourceNodeId: '1',
        targetNodeId: '2',
        type: 'line'
      }
    ]
  })
})
</script>

<style scoped>
#flow {
  width: 100%;
  height: 600px;
  border: 1px solid #ccc;
}
</style> 