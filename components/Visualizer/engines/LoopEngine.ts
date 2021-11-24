import { singleton } from "tsyringe";
import SceneInterface from "../scenes/SceneInterface";
import RenderingEngine from "./RenderingEngine";
import { update } from '@tweenjs/tween.js';

@singleton()
export default class LoopEngine {
  private nextFrame?: number;
  private scene?: SceneInterface;

  constructor(
    private renderingEngine: RenderingEngine
  ) {}

  get isRunning(): boolean {
    return !!this.nextFrame;
  }

  setScene(scene: SceneInterface) {
    this.scene = scene;

    if (this.isRunning) {
      this.stop();
      this.start();
    }
  }

  private loop(scene: SceneInterface) {
    this.nextFrame = requestAnimationFrame((time) => {
      update(time);
      this.loop(scene)
    });

    scene.update();

    this.renderingEngine.update(scene);
  }

  start() {
    if (!this.scene) {
      throw new Error('LoopEngine: Cannot start without a scene');
    }

    if (this.isRunning) {
      throw new Error('LoopEngine: Already running');
    }

    this.loop(this.scene);
  }

  stop() {
    if (!this.nextFrame) {
      return;
    }
    cancelAnimationFrame(this.nextFrame);
    this.nextFrame = undefined;
  }
}