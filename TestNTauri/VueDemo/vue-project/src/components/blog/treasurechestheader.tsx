import { defineComponent } from 'vue'
import '@/assets/blog/terasurechestheader.css'

export default defineComponent({
  name: 'TreasureChestHeader',
  setup() {
    const videoSource = '/te.mp4' // 替换为实际的视频路径

    return () => (
      <div class="header-container">
       
        <video
          class="background-video"
          autoplay
          loop
          muted
          playsinline
        >
          <source src={videoSource} type="video/mp4" />
        </video>

      
        <div class="content-overlay">
          <div class="header-content">
            <h1 class="title">百宝箱</h1>
            <p class="subtitle">这里什么都没有</p>
          </div>
        </div>
      </div>
    )
  }
})