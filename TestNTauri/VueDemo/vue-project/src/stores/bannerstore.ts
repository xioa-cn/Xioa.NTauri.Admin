import { defineStore } from 'pinia'
import { ref } from 'vue'

interface BannerState {
  banner: boolean
}

export const useBannerStore = defineStore('banner', {
  state: (): BannerState => ({
    banner: false
  }),
  
  getters: {
    getBanner(): boolean {
      return this.banner
    }
  },
  
  actions: {
    setBanner(value: boolean) {
      this.banner = value
    }
  }
})