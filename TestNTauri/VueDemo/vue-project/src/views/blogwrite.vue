<script setup lang="ts">
import blogwritetitle from '@/components/blog/blogwritetitle';
import { ref } from 'vue'
import { NInput, useMessage, NButton, NDrawerContent, NSelect, NDrawer } from 'naive-ui'
import BlogContentBody from '@/components/blog/blogcontentbody.vue'
import type { Block } from "@/types/Blocktype"
import { useblogwritetocontentdata } from '@/hooks/useblogwritetocontentdata';
// import { blogContent } from '@/utils/blogcontentData';

const { todata } = useblogwritetocontentdata()

// 生成唯一ID的函数
const generateGuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
const title = ref('')
const blocks = ref<Block[]>([{
    id: generateGuid(),
    type: 'text',
    content: ''
}])
const message = useMessage()

// 标签选项
const tagOptions = [
    {
        label: '开发技术',
        value: '开发技术',
        disabled: false
    },
    {
        label: '资源共享',
        value: '资源共享',
        disabled: false
    },
    {
        label: '生活倒影',
        value: '生活倒影',
        disabled: false
    },
    {
        label: '阅读',
        value: '阅读',
        disabled: false
    }
]

// 文章信息
const summary = ref('')
const tags = ref<string[]>([])

const handleInsertCode = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'code',
        content: '// 在这里写代码'
    })
}

const handleInsertImage = async () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0]
        if (file) {
            const url = URL.createObjectURL(file)
            blocks.value.push({
                id: generateGuid(),
                type: 'image',
                content: url,
                alt: file.name
            })
        }
    }
    input.click()
}

const handleInsertText = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'text',
        content: '// 在这里写文本'
    })
}

const handleInsertWarning = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'warning',
        content: '强烈建议：...'
    })
}

const handleInsertInfo = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'info',
        content: '注意：...'
    })
}

const handleInsertLink = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'link',
        content: '',
        url: ''
    })
}

const handleInsertList = () => {
    blocks.value.push({
        id: generateGuid(),
        type: 'list',
        content: '表头',
        items: ['']  // 确保初始化时有一个空的列表项
    })
}

const handleContentClick = (e: MouseEvent) => {
    if (blocks.value.length === 0 ||
        (e.target as HTMLElement).classList.contains('content-editor') ||
        (e.target as HTMLElement).classList.contains('content-input')) {
        blocks.value.push({
            id: generateGuid(),
            type: 'text',
            content: ''
        })
    }
}

const removeBlock = (id: string) => {
    const index = blocks.value.findIndex(block => block.id === id)
    if (index !== -1) {
        blocks.value = blocks.value.filter(block => block.id !== id)
        // 如果删除后数组为空，添加一个新的文本块
        if (blocks.value.length === 0) {
            blocks.value.push({
                id: generateGuid(),
                type: 'text',
                content: ''
            })
        }
    }
}

const addListItem = (block: Block) => {
    if (!block.items) {
        block.items = []
    }
    block.items.push('')
}

const moveListItem = (block: Block, index: number, direction: 'up' | 'down') => {
    if (!block.items) return

    if (direction === 'up' && index > 0) {
        // 上移
        const temp = block.items[index]
        block.items[index] = block.items[index - 1]
        block.items[index - 1] = temp
    } else if (direction === 'down' && index < block.items.length - 1) {
        // 下移
        const temp = block.items[index]
        block.items[index] = block.items[index + 1]
        block.items[index + 1] = temp
    }
}

const removeListItem = (block: Block, index: number) => {
    if (block.items && block.items.length > 1) {  // 保持至少一个列表项
        block.items.splice(index, 1)
    }
}
const blogContentwrite = ref<any>({})
const active = ref(false)
// 操作方法
const handleSaveDraft = () => {
    // TODO: 实现暂存功能
    message.success('已保存为草稿')
}

const handlePreview = () => {
    blogContentwrite.value = todata(blocks.value, title.value)
    active.value = true;
    console.log(blogContentwrite.value)
    // TODO: 实现预览功能
    message.info('预览功能开发中')
}

const handlePublish = () => {
    // TODO: 实现发布功能
    if (!title.value) {
        message.error('请输入文章标题')
        return
    }
    if (blocks.value.length === 0) {
        message.error('请输入文章内容')
        return
    }
    message.success('发布成功')
}

const moveBlock = (id: string, direction: 'up' | 'down') => {
    const index = blocks.value.findIndex(block => block.id === id)
    if (index === -1) return

    if (direction === 'up' && index > 0) {
        // 上移
        const temp = blocks.value[index]
        blocks.value[index] = blocks.value[index - 1]
        blocks.value[index - 1] = temp
    } else if (direction === 'down' && index < blocks.value.length - 1) {
        // 下移
        const temp = blocks.value[index]
        blocks.value[index] = blocks.value[index + 1]
        blocks.value[index + 1] = temp
    }
}

const moveBlockToTop = (id: string) => {
    const index = blocks.value.findIndex(block => block.id === id)
    if (index === -1 || index === 0) return

    const block = blocks.value[index]
    blocks.value.splice(index, 1)  // 移除当前位置
    blocks.value.unshift(block)    // 添加到开头
}
</script>

<template>
    <div class="blog-write-container">
        <div class="blog-write-title">
            <blogwritetitle :onInsertCode="handleInsertCode" :onInsertImage="handleInsertImage"
                :onInsertText="handleInsertText" :onInsertWarning="handleInsertWarning" :onInsertInfo="handleInsertInfo"
                :onInsertLink="handleInsertLink" :onInsertList="handleInsertList" />
        </div>

        <div class="blog-write-content">
            <div class="blog-write-content-left">
                <div class="blog-write-body">
                    <div class="title-input">
                        <n-input v-model:value="title" type="text" placeholder="请输入文章标题（5～100个字）" :maxlength="100"
                            :minlength="5" class="title-input-inner">
                            <template #suffix>
                                <span v-if="title.length < 5" class="char-count">还需输入 {{ 5 - title.length }} 个字</span>
                            </template>
                        </n-input>
                    </div>

                    <div class="content-input">
                        <div class="content-editor" ref="editorRef">
                            <div class="editor-block" v-for="(block, index) in blocks" :key="block.id">
                                <!-- 代码块 -->
                                <div v-if="block.type === 'code'" class="code-block">
                                    <div class="block-header">
                                        <span>代码块</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <span class="input-label">代码内容</span>
                                        <n-input v-model:value="block.content" type="textarea" placeholder="请输入"
                                            :autosize="{ minRows: 3 }" class="code-input" />
                                    </div>
                                </div>

                                <!-- 文本块 -->
                                <div v-else-if="block.type === 'text'" class="text-block">
                                    <div class="block-header">
                                        <span>文本块</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <span class="input-label">文本内容</span>
                                        <n-input v-model:value="block.content" type="textarea" placeholder=""
                                            :autosize="{ minRows: 3 }" class="code-input" />
                                    </div>
                                </div>

                                <!-- 图片块 -->
                                <div v-else-if="block.type === 'image'" class="image-block">
                                    <div class="block-header">
                                        <span>图片</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <img :src="block.content" :alt="block.alt || '图片'" />
                                </div>

                                <!-- 警告框 -->
                                <div v-else-if="block.type === 'warning'" class="warning-block">
                                    <div class="block-header">
                                        <span>警告</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div>
                                        <n-input v-model:value="block.content" type="textarea" placeholder=""
                                            :autosize="{ minRows: 2 }" />
                                    </div>
                                    <div class="input-group warning-block">
                                        <span>{{ block.content }}</span>
                                    </div>
                                </div>

                                <!-- 信息框 -->
                                <div v-else-if="block.type === 'info'" class="info-block">
                                    <div class="block-header">
                                        <span>提示</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div>
                                        <n-input v-model:value="block.content" type="textarea" placeholder=""
                                            :autosize="{ minRows: 2 }" />
                                    </div>
                                    <div class="input-group info-block">
                                        <span>{{ block.content }}</span>
                                    </div>
                                </div>

                                <!-- 链接 -->
                                <div v-else-if="block.type === 'link'" class="link-block">
                                    <div class="block-header">
                                        <span>链接</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div class="link-inputs">
                                        <div class="input-group">
                                            <span class="input-label">链接文本</span>
                                            <n-input v-model:value="block.content" type="text" placeholder="请输入"
                                                class="link-text-input" />
                                                <span class="input-label">链接地址</span>
                                            <n-input v-model:value="block.url" type="text" placeholder="请输入"
                                                class="link-url-input" />
                                        </div>
                                        
                                    </div>

                                    <div class="show-i">
                                        <a :href="block.url" class="link">{{ block.content }}</a>
                                    </div>
                                </div>

                                <!-- 列表 -->
                                <div v-else-if="block.type === 'list'" class="list-block">
                                    <div class="block-header">
                                        <span>列表</span>
                                        <div class="block-actions">
                                            <n-button circle text type="primary" @click="moveBlockToTop(block.id)"
                                                :disabled="index === 0">
                                                置顶
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'up')"
                                                :disabled="index === 0">
                                                上移
                                            </n-button>
                                            <n-button circle text type="primary" @click="moveBlock(block.id, 'down')"
                                                :disabled="index === blocks.length - 1">
                                                下移
                                            </n-button>
                                            <n-button circle text type="error" @click="removeBlock(block.id)">
                                                删除
                                            </n-button>
                                        </div>
                                    </div>
                                    <div class="input-group">
                                        <span class="input-label">列表头</span>
                                        <n-input v-model:value="block.content" placeholder="" />
                                        <span class="input-label">列表项</span>
                                        <div class="list-items">
                                            <div v-for="(item, index) in (block.items || [])" :key="index"
                                                class="list-item">
                                                <n-input v-model:value="block.items![index]" type="text"
                                                    placeholder="请输入列表项" />
                                                <div class="list-item-actions">
                                                    <n-button circle text type="primary"
                                                        @click="moveListItem(block, index, 'up')"
                                                        :disabled="index === 0">
                                                        上移
                                                    </n-button>
                                                    <n-button circle text type="primary"
                                                        @click="moveListItem(block, index, 'down')"
                                                        :disabled="index === (block.items?.length || 0) - 1">
                                                        下移
                                                    </n-button>
                                                    <n-button circle text type="error"
                                                        @click="removeListItem(block, index)">
                                                        删除
                                                    </n-button>
                                                </div>
                                            </div>
                                            <n-button text type="primary" @click="addListItem(block)">
                                                添加列表项
                                            </n-button>
                                        </div>
                                        <!-- 列表 -->
                                        <div class="list-content">
                                            <p>{{ block.content }}</p>
                                            <ul>
                                                <li v-for="(listItem, listIndex) in block.items" :key="listIndex">
                                                    {{ listItem }}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="blog-write-content-right">
                <div class="right-panel">
                    <div class="panel-section">
                        <div class="section-title">文章信息</div>
                        <div class="input-group">
                            <span class="input-label">摘要</span>
                            <n-input v-model:value="summary" type="textarea" placeholder="请输入文章摘要"
                                :autosize="{ minRows: 3, maxRows: 6 }" />
                        </div>
                        <div class="input-group">
                            <span class="input-label">标签</span>
                            <n-select
                                v-model:value="tags"
                                multiple
                                :options="tagOptions"
                                placeholder="请选择标签"
                                :max-tag-count="5"
                                :focusable="false"
                                :keyboard="false"
                            />
                        </div>
                    </div>

                    <div class="panel-section">
                        <div class="section-title">操作</div>
                        <div class="action-buttons">
                            <n-button type="primary" @click="handleSaveDraft">
                                暂存草稿
                            </n-button>
                            <n-button type="info" @click="handlePreview">
                                预览文章
                            </n-button>
                            <n-button type="success" @click="handlePublish">
                                发布文章
                            </n-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <n-drawer 
            v-model:show="active" 
            width="90%" 
            placement="right"
            
            :trap-focus="false"
            :auto-focus="false"
            display-directive="show"
        >
            <n-drawer-content>
                <template #header>
                    预览
                </template>
                <BlogContentBody :content="blogContentwrite" />
            </n-drawer-content>
        </n-drawer>
    </div>
</template>

<style scoped>
.show-i{
    width: 100%;
}
:deep(.n-drawer) {
  background: transparent;
}

:deep(.n-drawer-content) {
  height: 100%;
  overflow-y: auto;
}

:deep(.n-drawer-header) {
  padding: 16px;
  font-size: 18px;
  font-weight: 500;
}
.span-input {
    padding: 2px 6px;
    border-radius: 4px;
}

.blog-write-content {
    margin-top: 0px;
    display: flex;
    height: calc(100% - 40px);
    background-color: red;
}

.blog-write-container {
    margin-top: 60px;
    width: 100vw;
    position: absolute;
    height: calc(100vh - 60px);
}

.blog-write-title {
    width: 100vw;
    height: 40px;
    background-color: var(--primary-color);
}

.blog-write-content-left {
    background-color: blue;
    width: 60vw;
    height: 100%;
    overflow-y: auto;
}

.blog-write-content-right {
    background-color: #fff;
    width: 40vw;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.blog-write-body {
    padding: 20px;
    height: 100%;
    background-color: #fff;
}

.title-input {
    margin-bottom: 20px;
}

.title-input-inner {
    font-size: 24px;
    font-weight: 500;
}

.char-count {
    font-size: 14px;
    color: #999;
}

.content-input {
    height: calc(100% - 80px);
    overflow-y: auto;
}

.content-editor {
    min-height: 500px;
}

.editor-block {
    margin: 16px 0;
    padding: 16px;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.code-block {
    background: #f5f5f5;
    border-radius: 4px;
    padding: 10px;
}

.code-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.image-block {
    position: relative;
    text-align: center;
}

.image-block img {
    max-width: 100%;
    max-height: 500px;
    object-fit: contain;
}

.text-block .text-input {
    border: none;
    width: 100%;
}

:deep(.n-input) {
    --n-border: none;
    --n-border-hover: none;
    --n-border-focus: none;
    --n-border-radius: 0;
    --n-padding: 0;
    --n-font-size: inherit;
    --n-height: auto;
    background-color: transparent;
}

:deep(.n-input__textarea-el) {
    padding: 0 !important;
    min-height: unset !important;
}

:deep(.n-input__input-el) {
    padding: 0 !important;
    height: auto !important;
    line-height: inherit !important;
}

.text-input,
.code-input {
    width: 100%;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
    background-color: #f9f9f9;
    border-radius: 4px;
    padding: 12px;
}

.input-label {
    font-size: 14px;
    color: #666;
    line-height: 1.5;
}

.link-inputs {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
}

.link-text-input {
    flex: 1;
}

.link-url-input {
    flex: 2;
}

.warning-block {
    background-color: #fff9e6;
    border-left: 4px solid #ffd77a;
    padding: 12px 16px;
    margin: 10px 0;
    position: relative;
}

.warning-content {
    color: #666;
    line-height: 1.6;
}

.info-block {
    background-color: #f0f7ff;
    border-left: 4px solid #a3d0fd;
    padding: 12px 16px;
    margin: 10px 0;
    position: relative;
}

.info-content {
    color: #666;
    line-height: 1.6;
}

.link-block {
    padding: 8px 0;
    position: relative;
}

.link-content {
    color: #1890ff;
    text-decoration: none;
    cursor: pointer;
}

.link-content:hover {
    text-decoration: underline;
}

.list-block {
    padding: 8px 16px;
    position: relative;
}

.list-content {
    line-height: 1.8;
    color: #666;
}

.block-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
}

.block-actions {
    display: flex;
    gap: 4px;
    align-items: center;
}

:deep(.n-button.n-button--circle) {
    min-width: 24px;
    width: 24px;
    height: 24px;
    padding: 0;
    font-size: 12px;
}

:deep(.n-button.n-button--circle[disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
}

.right-panel {
    position: sticky;
    top: 20px;
}

.panel-section {
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.section-title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin-bottom: 16px;
}

.input-group {
    margin-bottom: 16px;
}

.input-group:last-child {
    margin-bottom: 0;
}

.action-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.action-buttons .n-button {
    width: 100%;
}

:deep(.n-select) {
    width: 100%;
}

:deep(.n-base-selection) {
  background-color: transparent !important;
}

:deep(.n-base-selection:hover) {
  box-shadow: none !important;
}

:deep(.n-base-selection__border) {
  border: none !important;
}

:deep(.n-base-selection__state-border) {
  border: none !important;
}
</style>