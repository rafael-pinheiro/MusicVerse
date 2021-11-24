import Player from "hooks/usePlayer/Player";
import { Mesh, PerspectiveCamera, Scene } from "three";
import { autoInjectable, inject } from "tsyringe";
import { Size } from "../commonTypes";
import ObjectFactory from "../objects/Factory";
import { AnyObject } from "../objects/types";
import SceneInterface from "./SceneInterface";

@autoInjectable()
export default class BasicScene implements SceneInterface {
  public scene: Scene;
  public camera: PerspectiveCamera;
  private objectList: AnyObject[] = [];

  constructor(
    protected factory: ObjectFactory,
    @inject('player') protected player: Player,
    @inject('canvas.size') private size: Size,
    @inject('canvas') protected canvas: HTMLCanvasElement,
  ) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000);
    this.setup();
  }

  add(object: AnyObject) {
    object.addToScene((mesh: Mesh) => {
      this.scene.add(mesh);
      this.objectList.push(object);
    });
  }

  setup() {
    throw new Error('Scene does not have a "setup" method.');
  }

  update() {
    this.objectList.forEach(obj => obj.update());
  }
}