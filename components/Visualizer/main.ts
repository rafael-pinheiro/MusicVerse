import Player from 'hooks/usePlayer/Player';
import { container } from 'tsyringe';
import { Size } from './commonTypes';
import LoopEngine from './engines/LoopEngine';
import MainScene from './scenes/MainScene';
import SceneInterface from './scenes/SceneInterface';

// Stops everything and clears the container for re-render from scratch
export const cleanup = () => {
  container.resolve(LoopEngine).stop();
  container.clearInstances();
}

export default function createVisualizer(canvas: HTMLCanvasElement, player: Player) {
  const size:Size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  container.register<Size>('canvas.size', {useValue: size});
  container.register<HTMLCanvasElement>('canvas', {useValue: canvas});
  container.register<Player>('player', {useValue: player});

  const scene = container.resolve<SceneInterface>(MainScene);
  const loopEngine = container.resolve(LoopEngine);

  loopEngine.setScene(scene);
  loopEngine.start();
}
