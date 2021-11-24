import Player from "hooks/usePlayer/Player";
import { AnimationAction, AnimationClip, AnimationMixer, Clock, VectorKeyframeTrack } from "three";
import { VisualObjectGroup } from "../objects/types";
import { GroupBehaviour } from "./Behaviour";

export default class HeightAndColor extends GroupBehaviour {
  private clock = new Clock();
  private mixers: AnimationMixer[] = [];

  constructor(group: VisualObjectGroup, player: Player) {
    super(group);

    let actions:AnimationAction[] = [];

    player.on('analysis', (analysis) => {
      const { times, values } = analysis.reduce((result, { end, pitches }, index: number) => {
        
        result.times.push(end);

        pitches.forEach((pitch: number, index: number) => {
          result.values[index].push(1);
          result.values[index].push(pitch);
          result.values[index].push(1);
        });
  
        return result;
      }, { times: [], values: Array(12).fill(0).map(() => [])});

      this.mixers = this.getMixers();
      
      actions = this.mixers.map((mixer, index) => {
        const scaleTrack = new VectorKeyframeTrack('.scale', times, values[index]);
        const scaleAnimation = new AnimationClip(`cube[${index}].scale`, -1, [scaleTrack]);
        const action = mixer.clipAction(scaleAnimation);
        action.play();

        return action;
      });
    });

    player.on('update', (status) => {
      actions.forEach(action => {
        action.time = status.position;
        action.paused = status.paused;
      });
    });
  }

  update() {
    const delta = this.clock.getDelta();
    this.mixers.forEach(mixer => mixer.update(delta));
  }
}