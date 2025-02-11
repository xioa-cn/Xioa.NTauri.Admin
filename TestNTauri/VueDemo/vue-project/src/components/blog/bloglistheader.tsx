import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import "@/assets/blog/bloglistheader.css"

export default defineComponent({
    name: 'BlogListHeader',
    props: {
        title: {
            type: String as PropType<string>,
            required: true,
        },
    },
    setup(props) {
        return () => (
            <div class="blog-list-header">
                <div class="blog-list-header-content">
                    <div class="blog-list-title-section">
                        <h1>{props.title}</h1>
                        <div class="blog-list-subtitle">发现有趣的内容</div>
                    </div>
                    <div class="blog-list-header-decoration">
                        <div class="blog-list-leaf-icon">🌱</div>
                    </div>
                </div>

            </div>
        )
    }
})