import { BoxGeometry, Mesh, Material, MeshBasicMaterial } from "three";
import { container } from "tsyringe";
import ObjectFactory from "./Factory";
import { VisualObject, VisualObjectGroup } from "./types";

export type CubeGroupConfig = {
  amount?: number;
  spacing?: number;
  material?: Material;
  geometry?: BoxGeometry;
};

const defaultParameters: CubeGroupConfig = {
  material: new MeshBasicMaterial(),
  spacing: 2,
  amount: 12,
}

export default class CubeGroup implements VisualObjectGroup {
  private cubes: VisualObject[];

  constructor(config: CubeGroupConfig = defaultParameters) {
    const factory = container.resolve(ObjectFactory);
    let position = -12;
    const step = 2;

    this.cubes = Array(12).fill(0).map((_, index) => {
      const cube = factory.cube(0xff69ff, [position, 0, 0]);
      position += step;

      return cube;
    });
  }

  addToScene(sceneHandler: (mesh: Mesh) => void) {
    this.cubes.forEach(cube => cube.addToScene(sceneHandler));
  }

  getMixers() {
    return this.cubes.map(cube => cube.getMixer());
  }

  update() {}
}