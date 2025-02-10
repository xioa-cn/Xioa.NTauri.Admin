import { defineComponent, type PropType } from 'vue'
import '@/assets/blog/blogcontenttitle.css'
import type { BlogContentTitle } from '@/types/blogcontenttitletype'

export default defineComponent({
  name: 'BlogContentTitle',
  props: {
    blogContentTitle: {
      type: Object as PropType<BlogContentTitle>,
      required: true
    }
  },

  setup(props) {
    return () => (
      <div class="blog-title-container">
        <h1 class="blog-main-title">{props.blogContentTitle.title}</h1>
        <div class="blog-meta">
          <span class="author">
            👤 {props.blogContentTitle.author}
          </span>
          <span class="date">
            🕒 {props.blogContentTitle.date}
          </span>
          <span class="views">
            👁️ {props.blogContentTitle.views}
          </span>
          <span class="comments">
            💬 {props.blogContentTitle.comments}
          </span>
          <span class="likes">
            ❤️ {props.blogContentTitle.likes}
          </span>
        </div>
      </div>
    )
  }
})
