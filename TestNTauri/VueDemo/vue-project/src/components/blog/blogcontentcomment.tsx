import { defineComponent, ref, type PropType } from 'vue'
import '@/assets/blog/blogcontentcomment.css'

export default defineComponent({
  name: 'BlogContentComment',
  props: {
    onSubmitComment: {
      type: Function as PropType<(content: string) => void>,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const commentText = ref('')

    const handleSubmit = () => {
      if (commentText.value.trim() && !props.loading) {
        props.onSubmitComment(commentText.value)
        commentText.value = ''
      }
    }

    return () => (
      <div class="comment-container">
        <textarea
          v-model={commentText.value}
          class="comment-input"
          placeholder="写下点什么..."
          disabled={props.loading}
        />
        <div class="comment-footer">
          <div class="tool-buttons">
            <button class="tool-btn" disabled={props.loading}>
              <i class="fas fa-image"></i>
            </button>
            <button class="tool-btn" disabled={props.loading}>
              <i class="fas fa-smile"></i>
            </button>
          </div>
          <button 
            class="submit-btn"
            disabled={!commentText.value.trim() || props.loading}
            onClick={handleSubmit}
          >
            {props.loading ? '提交中...' : '提交'}
          </button>
        </div>
      </div>
    )
  }
})