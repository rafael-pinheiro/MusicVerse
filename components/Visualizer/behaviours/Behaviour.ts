import { Mesh } from "three";
import { UpdateContext } from "../commonTypes";
import { VisualObject, VisualObjectGroup } from "../objects/types"

export class Behaviour implements VisualObject {
  protected object: VisualObject;

  constructor(object: VisualObject) {
    this.object = object;
  }

  addToScene(sceneHandler: (mesh: Mesh) => void) {
    this.object.addToScene(sceneHandler);
  }

  setup() {}

  update() {}

  getMixer() {
    return this.object.getMixer();
  }
}

export class GroupBehaviour implements VisualObjectGroup {
  protected group: VisualObjectGroup;

  constructor(group: VisualObjectGroup) {
    this.group = group;
  }

  addToScene(sceneHandler: (mesh: Mesh) => void) {
    this.group.addToScene(sceneHandler);
  }

  setup() {}

  update() {}

  getMixers() {
    return this.group.getMixers();
  }
}