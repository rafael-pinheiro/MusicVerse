import { AnimationMixer, BoxGeometry, Material, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { Geometry } from "../commonTypes";
import { VisualObject } from "./types";

export type BasicObjectConfig = {
  material?: Material;
  geometry?: BoxGeometry;
  position?: [number, number, number]
};

const defaultParameters: BasicObjectConfig = {
  material: new MeshBasicMaterial(),
}

export default class BasicObject implements VisualObject {
  protected body: Mesh;
  protected geometry?: Geometry;

  constructor(config: BasicObjectConfig = defaultParameters) {
    this.body = new Mesh(config.geometry, config.material);

    if (config.position) {
      this.body.position.set(...config.position);
    }
  }

  addToScene(sceneHandler: (mesh: Mesh) => void) {
    sceneHandler(this.body);
  }

  getMixer() {
    return new AnimationMixer(this.body);
  }

  update() {}
}