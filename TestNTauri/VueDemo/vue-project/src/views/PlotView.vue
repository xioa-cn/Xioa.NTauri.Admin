<template>
    <div class="plot-container">
      <div class="control-panel">
        <n-input-group>
          <n-input-number v-model:value="markPoint.x" placeholder="位移值" />
          <n-input-number v-model:value="markPoint.y" placeholder="压力值" />
          <n-button @click="addMarkPoint">添加标记点</n-button>
          <n-button @click="clearMarkPoints" type="warning">清空标记点</n-button>
          <n-button @click="clearAllData" type="error">清空所有数据</n-button>
        </n-input-group>

        <!-- 添加坐标轴范围设置 -->
        <n-input-group class="axis-control">
          <n-input-number v-model:value="axisRange.xMin" placeholder="X轴最小值" />
          <n-input-number v-model:value="axisRange.xMax" placeholder="X轴最大值" />
          <n-input-number v-model:value="axisRange.yMin" placeholder="Y轴最小值" />
          <n-input-number v-model:value="axisRange.yMax" placeholder="Y轴最大值" />
          <n-button @click="updateAxisRange" type="primary">更新坐标范围</n-button>
        </n-input-group>
      </div>
      <div id="container" ref="container" class="chart"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted, onUnmounted } from 'vue'
  import { Chart } from '@antv/g2'
  import { NInputGroup, NInputNumber, NButton } from 'naive-ui'
  
  const container = ref<HTMLElement | null>(null)
  let chart: Chart | null = null
  let currentX = 0
  let timer: number | undefined
  
  // 数据和标记点
  const data = ref<Array<{ x: number; y: number }>>([])
  const markPoint = reactive({
    x: 0,
    y: 0
  })
  const markPoints = ref<Array<{ x: number; y: number }>>([])
  
  // 添加坐标轴范围状态
  const axisRange = reactive({
    xMin: 0,
    xMax: 500,
    yMin: -10,
    yMax: 10
  })
  
  // 初始化图表
  const initChart = () => {
    if (!container.value) return

    chart = new Chart({
      container: container.value,
      autoFit: true,
      padding: [40, 40, 40, 60]
    })

    // 配置主数据线
    const mainLayer = chart.line()
      .data(data.value)
      .encode('x', 'x')
      .encode('y', 'y')
      .scale('x', {
        domain: [axisRange.xMin, axisRange.xMax],
        nice: false
      })
      .scale('y', {
        domain: [axisRange.yMin, axisRange.yMax],
        nice: false
      })
      .axis('x', {
        title: '位移(mm)',
        tickCount: 10,
        grid: true
      })
      .axis('y', {
        title: '压力(MPa)',
        tickCount: 10,
        grid: true
      })
      .style({
        stroke: '#1890ff',
        lineWidth: 2,
        smooth: true,
        point: {
          size: 0,
          shape: null
        }
      })
      .tooltip({
        title: (d: any) => `位移: ${d.x.toFixed(2)}`,
        items: [
          { field: 'y', label: '压力' }
        ]
      })
      .animate(false)  // 关闭动画

    // 配置标记点
    const pointLayer = chart.point()
      .data(markPoints.value)
      .encode('x', 'x')
      .encode('y', 'y')
      .style({
        fill: 'red',
        size: 8
      })
      .animate(false)

    chart.render()
  }
  
  // 更新数据
  const updateChart = () => {
    if (!chart) return
    // 使用完整的数据更新，避免连接到原点
    chart.changeData(data.value)
    chart.getLayer(1).changeData(markPoints.value)
  }
  
  // 添加标记点
  const addMarkPoint = () => {
    markPoints.value.push({
      x: markPoint.x,
      y: markPoint.y
    })
    // 只更新标记点图层
    chart?.getLayer(1).changeData(markPoints.value)
  }
  
  // 清空标记点
  const clearMarkPoints = () => {
    markPoints.value = []
    // 只更新标记点图层
    chart?.getLayer(1).changeData(markPoints.value)
  }
  
  // 清空所有数据
  const clearAllData = () => {
    data.value = []
    markPoints.value = []
    currentX = 0
    // 分别更新两个图层
    chart?.changeData(data.value)
    chart?.getLayer(1).changeData(markPoints.value)
  }
  
  // 更新坐标轴范围
  const updateAxisRange = () => {
    if (!chart) return
    chart.scale('x', {
      domain: [axisRange.xMin, axisRange.xMax],
      nice: false  // 关闭自动调整
    })
    chart.scale('y', {
      domain: [axisRange.yMin, axisRange.yMax],
      nice: false  // 关闭自动调整
    })
    chart.render()
  }
  
  // 添加随机波动生成函数
  const generateRandomWalk = (lastValue: number): number => {
    // 生成-1到1之间的随机数
    const random = Math.random() * 2 - 1
    // 根据上一个值生成新值，添加一些随机波动
    const change = random * 0.5  // 控制波动幅度
    const newValue = lastValue + change
    
    // 限制在合理范围内
    return Math.max(Math.min(newValue, axisRange.yMax), axisRange.yMin)
  }
  
  onMounted(() => {
    initChart()
    let lastValue = 0

    timer = window.setInterval(() => {
      lastValue = generateRandomWalk(lastValue)
      const newPoint = {
        x: currentX,
        y: lastValue
      }
      
      // 添加新数据点
      data.value = [...data.value, newPoint]  // 使用新数组而不是 push

      // 如果当前 X 超出显示范围，移动视图
      if (currentX > axisRange.xMax) {
        axisRange.xMin += 0.1
        axisRange.xMax += 0.1
        updateAxisRange()
      }

      currentX += 0.1
      // 使用完整数据更新
      if (chart) {
        chart.changeData(data.value)
      }
    }, 10)
  })
  
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer)
    }
    if (chart) {
      chart.destroy()
    }
  })
  </script>
  
  <style scoped>
  .plot-container {
    width: 100%;
    height: calc(100vh - 144px);  /* 改为视口高度 */
    display: flex;
    flex-direction: column;
    padding: 16px;
    box-sizing: border-box;
    background: #fff;
  }
  
  .control-panel {
    margin-bottom: 16px;
  }
  
  .axis-control {
    margin-top: 8px;  /* 添加一些间距 */
  }
  
  .chart {
    flex: 1;
    width: 100%;
    height: calc(100vh - 80px);  /* 减去控制面板和padding的高度 */
    min-height: 400px;  /* 设置最小高度 */
    background: #fff;
  }
  </style>