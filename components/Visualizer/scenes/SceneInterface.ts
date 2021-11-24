import { PerspectiveCamera, Scene } from "three";
import { AnyObject } from "../objects/types";

export default interface SceneInterface {
  scene: Scene;
  camera: PerspectiveCamera;
  add: (object: AnyObject) => void;
  setup: () => void;
  update: () => void;
}