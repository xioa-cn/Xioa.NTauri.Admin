import type { MenuOption } from 'naive-ui'
import { NIcon } from 'naive-ui'
import {
    HomeOutline,
    LayersOutline,
    SettingsOutline,
    DocumentTextOutline,
    BarChartOutline,
} from '@vicons/ionicons5'
import { h } from 'vue'

export function useRouters() {
    function renderIcon(icon: any) {
        return () => h(NIcon, null, { default: () => h(icon) })
    }
    const menuOptions: MenuOption[] = [
        {
            label: '首页',
            key: '/main/welcome',
            icon: renderIcon(HomeOutline)
        },
        {
            label: '流程管理',
            key: 'flow',
            icon: renderIcon(LayersOutline),
            children: [
                {
                    label: '流程设计',
                    key: '/main/plot'
                },
                {
                    label: '流程列表',
                    key: '/main/list'
                }
            ]
        },
        {
            label: '数据分析',
            key: 'analysis',
            icon: renderIcon(BarChartOutline),
            children: [
                {
                    label: '曲线示例',
                    key: '/main/plot'
                },
                {
                    label: '详细报表',
                    key: '/main/report'
                }
            ]
        },
        {
            label: '文档中心',
            key: '/main/docs',
            icon: renderIcon(DocumentTextOutline)
        },
        {
            label: '系统设置',
            key: '/main/settings',
            icon: renderIcon(SettingsOutline)
        }
    ]

    return {
        menuOptions,
    }
}