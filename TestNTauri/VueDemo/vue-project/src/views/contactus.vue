<script setup lang="ts">
import { ref } from 'vue'
import {
    LocationOutline,
    MailOutline,
    PhonePortraitOutline,
    LogoGithub,
    LogoTwitter,
    LogoLinkedin,
    LogoWechat
} from '@vicons/ionicons5'
import type { FormInst, FormRules } from 'naive-ui'
import { NForm, NFormItem, NInput, NButton, NSpace } from 'naive-ui'

const contactMethods = [
    {
        icon: LocationOutline,
        title: '地址',
        value: '浙江省杭州市西湖区'
    },
    {
        icon: MailOutline,
        title: '邮箱',
        value: 'contact@example.com'
    },
    {
        icon: PhonePortraitOutline,
        title: '电话',
        value: '+86 123 4567 8900'
    }
]

const socialLinks = [
    { icon: LogoGithub, url: '#' },
    { icon: LogoTwitter, url: '#' },
    { icon: LogoLinkedin, url: '#' },
    { icon: LogoWechat, url: '#' }
]

const formRef = ref<FormInst | null>(null)
const formData = ref({
    name: '',
    email: '',
    message: ''
})

const rules: FormRules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
    ],
    message: [{ required: true, message: '请输入消息内容', trigger: 'blur' }]
}

const handleSubmit = (e: MouseEvent) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            console.log(formData.value)
        }
    })
}
</script>

<template>
    <div class="contact-container">
        <!-- 标题区域 -->
        <div class="header-section">
            <h1>联系我们</h1>
            <p class="subtitle">
                我们期待与您交流想法，分享创新。无论您有任何问题或建议，都欢迎与我们联系。
            </p>
        </div>

        <!-- 插画区域 -->
        <div class="illustration-section">
            <div class="illustration-wrapper">
                <img src="/contactus.svg" alt="Contact Illustration">
            </div>
        </div>

        <!-- 表单区域 -->
        <div class="form-section">
            <h2>Join Us</h2>
            <p class="form-subtitle">让我们开始一段对话</p>

            <n-form ref="formRef" :model="formData" :rules="rules" label-placement="top">
                <div class="form-row">
                    <n-form-item path="name">
                        <n-input v-model:value="formData.name" placeholder="您的名字" class="clean-input" />
                    </n-form-item>
                </div>

                <div class="form-row">
                    <n-form-item path="email">
                        <n-input v-model:value="formData.email" placeholder="您的邮箱" class="clean-input" />
                    </n-form-item>
                </div>

                <div class="form-row">
                    <n-form-item path="message">
                        <n-input 
                            v-model:value="formData.message" 
                            type="textarea" 
                            placeholder="请输入您的想法..." 
                            class="clean-input" 
                            :autosize="{
                                minRows: 3,
                                maxRows: 5
                            }" 
                        />
                    </n-form-item>
                </div>

                <div class="form-row">
                    <n-button type="primary" size="large" @click="handleSubmit" class="submit-button">
                        发送消息
                    </n-button>
                </div>
            </n-form>
        </div>
    </div>
</template>

<style scoped>
.contact-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 60px 20px;
    text-align: center;
}

.header-section {
    margin-bottom: 60px;
}

.header-section h1 {
    font-size: 3.5rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    line-height: 1.2;
}

.subtitle {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.illustration-section {
    margin: 60px 0;
}

.illustration-wrapper {
    max-width: 500px;
    margin: 0 auto;
}

.illustration-wrapper img {
    width: 100%;
    height: auto;
}

.form-section {
    max-width: 460px;
    margin: 0 auto;
    text-align: center;
    padding: 40px 20px;
}

.form-section h2 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 12px;
    font-weight: 600;
}

.form-subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 40px;
}

.form-row {
    margin-bottom: 24px;
}

/* 所有输入框的通用样式 */
:deep(.clean-input) {
    background: transparent;
    border: none;
    border-bottom: 2px solid #eee;
    border-radius: 0;
    padding: 12px 0;
    transition: all 0.3s ease;
    text-align: left !important;
}

:deep(.n-input__input) {
    text-align: left !important;
    padding: 0 !important;
}

:deep(.n-input__wrapper) {
    text-align: left !important;
    padding: 0 !important;
    border: none !important;
    justify-content: flex-start !important;
}

:deep(.n-input__placeholder) {
    text-align: left !important;
    left: 0 !important;
    transform: none !important;
    padding: 0 !important;
}

:deep(.n-form-item) {
    text-align: left !important;
}

:deep(.n-form-item-feedback) {
    text-align: left !important;
}

/* 移除所有默认样式 */
:deep(.n-input-wrapper--focused) {
    box-shadow: none !important;
}

/* 特别处理文本域 */
:deep(.n-input__textarea-el) {
    min-height: 120px !important;
    padding: 0 !important;
    line-height: 1.6;
    resize: none;
    text-align: left !important;
    text-indent: 0 !important;
}

.submit-button {
    width: 100%;
    height: 50px;
    font-size: 1.1rem;
    background: #333;
    border: none;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.submit-button:hover {
    background: #000;
    transform: translateY(-2px);
}

/* 移除表单项的外边距 */
:deep(.n-form-item) {
    margin-bottom: 0;
}

/* 移除表单项标签 */
:deep(.n-form-item-label) {
    display: none;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .form-section {
        padding: 20px;
    }

    .form-section h2 {
        font-size: 2rem;
    }
}

/* 动画效果 */
.contact-container {
    animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
