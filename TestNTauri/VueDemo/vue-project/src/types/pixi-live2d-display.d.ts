declare module 'pixi-live2d-display' {
    import { DisplayObject } from 'pixi.js'
  
    export class Live2DModel extends DisplayObject {
      static from(modelPath: string): Promise<Live2DModel>
      focus(x: number, y: number): void
      getBounds(): { x: number; y: number; width: number; height: number }
      scale: { set: (scale: number) => void }
      position: { set: (x: number, y: number) => void }
    }
  }