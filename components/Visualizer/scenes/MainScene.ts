import BasicScene from "./BasicScene";
import soundHeightAndColor from "../behaviours/HeightAndColor";
import { AnimationAction, AnimationClip, AnimationMixer, Clock, Color, DirectionalLight, NumberKeyframeTrack, SpotLight, VectorKeyframeTrack } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween } from '@tweenjs/tween.js';
import { analysis } from "infrastructure/audio";
import HeightAndColor from "../behaviours/HeightAndColor";

let mixer;
const clock = new Clock();

export default class MainScene extends BasicScene {
  setup() {
    const orbitControls = new OrbitControls(this.camera, this.canvas);
    this.scene.background = new Color(0x87ceeb);
    this.camera.position.z = 15;

    const light = new DirectionalLight('white', 8);

    light.position.set(10, 10, 10);

    this.scene.add(light);

    const cubeGroup = new HeightAndColor(
      this.factory.cubeGroup(),
      this.player
    );

    this.add(cubeGroup);
  }
}