import { AnimationMixer, Mesh } from "three";

type addToScene = (sceneHandler: (mesh: Mesh) => void) => void;

export interface VisualObject {
  addToScene: addToScene;
  getMixer(): AnimationMixer;
  update(): void;
}

export interface VisualObjectGroup {
  addToScene: addToScene;
  getMixers(): AnimationMixer[];
  update(): void;
}

export type AnyObject = VisualObject | VisualObjectGroup;