<template>
    <footer class="blog-footer">
        <div class="footer-content">
            <div class="footer-text">
                <span>云想衣裳花想容，春风拂槛露华浓。</span>
                <span class="divider">·</span>
                <span>本网站由 XIOA 强力驱动 </span>
                <span class="divider">·</span>
                <span>ICP备20250202020号</span>
            </div>
            <div class="footer-text secondary">
                <span>本网站涉及的所有文字、图片及音频资料，仅供大家交流学习参考。</span>
                <span class="divider">·</span>
                <span>未经允许，请勿转载。</span>
            </div>
            <div class="footer-text secondary">
                <span>如无意中侵犯了您个人或企业的知识产权，请及时通过电子邮件联系我们。本网站将立即停止相关内容。</span>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.blog-footer {
    width: 100%;
    background: url('/5.jpg') no-repeat center center;
    backdrop-filter: blur(10px);
    padding: 20px 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.footer-text {
    line-height: 1.8;
    margin: 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
}

.footer-text.secondary {
    color: rgba(255, 255, 255, 0.6);
    font-size: 12px;
}

.divider {
    color: rgba(255, 255, 255, 0.3);
    margin: 0 8px;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer-text {
        flex-direction: column;
        gap: 4px;
    }

    .divider {
        display: none;
    }
}

/* 悬停效果 */
.footer-text span:not(.divider):hover {
    color: #fff;
    transition: color 0.3s ease;
}
</style>
