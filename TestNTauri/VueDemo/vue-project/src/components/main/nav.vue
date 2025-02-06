<template>
  <n-menu
    v-model:value="activeKey"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    @update:value="handleUpdateValue"
  />
</template>

<script setup lang="ts">
import { NMenu, NIcon } from 'naive-ui'
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import {
  HomeOutline,
  LayersOutline,
  SettingsOutline,
  DocumentTextOutline,
  BarChartOutline,
} from '@vicons/ionicons5'

const router = useRouter()
const activeKey = ref<string | null>(null)

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: '首页',
    key: '/',
    icon: renderIcon(HomeOutline)
  },
  {
    label: '流程管理',
    key: 'flow',
    icon: renderIcon(LayersOutline),
    children: [
      {
        label: '流程设计',
        key: '/flow/design'
      },
      {
        label: '流程列表',
        key: '/flow/list'
      }
    ]
  },
  {
    label: '数据分析',
    key: 'analysis',
    icon: renderIcon(BarChartOutline),
    children: [
      {
        label: '数据概览',
        key: '/analysis/overview'
      },
      {
        label: '详细报表',
        key: '/analysis/report'
      }
    ]
  },
  {
    label: '文档中心',
    key: '/docs',
    icon: renderIcon(DocumentTextOutline)
  },
  {
    label: '系统设置',
    key: '/settings',
    icon: renderIcon(SettingsOutline)
  }
]

// 处理菜单选择
const handleUpdateValue = (key: string) => {
  router.push(key)
}

defineProps<{
  collapsed: boolean
}>()
</script>

<style scoped>
:deep(.n-menu) {
  height: 100%;
}

:deep(.n-menu-item-content) {
  padding: 0 20px;
}

:deep(.n-menu-item-content__icon) {
  width: 24px;
  height: 24px;
  margin-right: 12px;
}

:deep(.n-menu--collapsed) {
  width: 64px;
}

:deep(.n-menu--collapsed .n-menu-item-content) {
  padding: 0;
}

:deep(.n-menu--collapsed .n-menu-item-content__icon) {
  margin: 0;
  position: absolute;
  left: 20px;
}

:deep(.n-menu--collapsed .n-menu-item-content-header) {
  opacity: 0;
}

:deep(.n-menu--collapsed .n-submenu-children) {
  padding: 0;
}

:deep(.n-menu-item) {
  height: 50px;
}
</style>