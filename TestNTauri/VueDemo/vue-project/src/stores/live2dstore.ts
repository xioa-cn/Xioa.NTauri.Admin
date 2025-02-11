import { defineStore } from 'pinia'

interface useLive2dState {
    live2d: boolean
}

export const useLive2dState = defineStore('live2d', {
    state: (): useLive2dState => ({
      live2d: true
    }),
    
    getters: {
        getLive2d(): boolean {
        return this.live2d
      }
    },
    
    actions: {
        setLive2d(value: boolean) {
            this.live2d = value
        },
        
        toggleLive2d() {
            this.live2d = !this.live2d
        }
    }
  })