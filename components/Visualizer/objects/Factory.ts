import { BoxGeometry, MeshStandardMaterial } from "three";
import { singleton } from "tsyringe";
import BasicObject from "./BasicObject";
import CubeGroup from "./CubeGroup";

@singleton()
export default class ObjectFactory {
  cube(color: number, position?: [number, number, number]): BasicObject {
    return new BasicObject({
      material: new MeshStandardMaterial({
        color
      }),
      geometry: new BoxGeometry(1, 20),
      position
    });
  }

  cubeGroup(): CubeGroup {
    return new CubeGroup();
  }
}