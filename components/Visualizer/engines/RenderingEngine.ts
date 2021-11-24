import { inject, singleton } from 'tsyringe';
import { WebGLRenderer } from 'three';
import { Size } from '../commonTypes';
import SceneInterface from '../scenes/SceneInterface';

@singleton()
export default class RenderingEngine {
  renderer: WebGLRenderer;

  constructor(
    @inject('canvas') private canvas: HTMLCanvasElement,
    @inject('canvas.size') private size: Size,
  ) {
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.renderer.setSize(size.width, size.height);
    this.renderer.physicallyCorrectLights = true; 
  }

  update(scene: SceneInterface) {
    this.renderer.render(scene.scene, scene.camera);
  }
}