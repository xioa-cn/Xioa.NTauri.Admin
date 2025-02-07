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
import { NMenu } from 'naive-ui'
import { h, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRouters } from '@/hooks/useRouters'

const router = useRouter()
const activeKey = ref<string | null>(null)


const { menuOptions } = useRouters()


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