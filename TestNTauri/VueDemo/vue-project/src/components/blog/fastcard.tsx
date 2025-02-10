import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import '@/assets/blog/fastcard.css'
import type { BlogPost } from '@/types/blogfastpost'
import { gradients } from '@/utils/gradients'

export default defineComponent({
    name: 'FastCard',
    props: {
      post: {
        type: Object as PropType<BlogPost>,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      }
    },
    setup(props) {
        
        const randomIndex = Math.floor(Math.random() * gradients.length);
    const getGradient = () => {
        return gradients[randomIndex]
      }
      return () => (
        <div class={`fast-blog-card ${props.index % 2 === 1 ? 'fast-image-left' : ''}`}
        style={{ background: getGradient() }}
        >
          <div class="fast-blog-content">
            <div class="fast-blog-meta">
              <span class="fast-date">
                <i class="fast-fas fast-fa-calendar"></i> {props.post.date}
              </span>
              <div class="fast-meta-right">
                <span class="fast-views">
                  <i class="fast-fas fast-fa-fire"></i> {props.post.viewCount}人看过
                </span>
                <span class="fast-category">
                  <i class="fast-fas fast-fa-tag"></i> {props.post.category}
                </span>
              </div>
            </div>
            <div class="fast-blog-title-section">
              <h2 class="fast-blog-title">{props.post.title}</h2>
              <p class="fast-blog-subtitle">{props.post.subtitle}</p>
            </div>
          </div>
          <div class="fast-blog-image-container">
            <div 
              class="fast-blog-image" 
              style={{ backgroundImage: `url(${props.post.coverImage})` }}
            ></div>
          </div>
        </div>
      )
    }
  })