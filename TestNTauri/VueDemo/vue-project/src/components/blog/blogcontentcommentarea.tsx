import { defineComponent, type PropType } from 'vue'
import '@/assets/blog/blogcontentcommentarea.css'
import type { Comment } from '@/types/blogcommentareatype'


export default defineComponent({
  name: 'BlogContentCommentArea',
  props: {
    comments: {
      type: Array as PropType<Comment[]>,
      required: true
    }
  },
  setup(props) {
    const getTagClass = (tag: string) => {
      switch (tag.toUpperCase()) {
        case 'SVIP':
          return 'user-tag tag-svip'
        case 'VIP':
          return 'user-tag tag-vip'
        case '全身场':
          return 'user-tag tag-svip'
        case '管理员':
          return 'user-tag tag-admin'
        default:
          return 'user-tag tag-normal'
      }
    }

    return () => (
      <div class="comment-area">
        <div class="comment-list">
          {props.comments.map(comment => (
            <div key={comment.id} class="comment-item">

              <div class="comment-avatar">
                <img src={comment.avatar} alt={comment.username} />
              </div>
              <div class="comment-content">
                <div class="comment-info">
                  <div class="comment-user">
                    <span class="username">{comment.username}</span>
                    {comment.tags.map((tag, index) => (
                      <span key={index} class={getTagClass(tag)}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span class="comment-date">{comment.date}</span>
                </div>
                <div class="comment-text">{comment.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
})
