import usePlayer from 'hooks/usePlayer';
import { useEffect, useRef } from 'react';
import createVisualizer, { cleanup } from './main';
import Start from './Start';

type Props = {
  accessToken: string;
};

export default function Visualizer({ accessToken }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const player = usePlayer(accessToken);

  useEffect(() => {
    if (!process.browser || !canvasRef.current || !player) {
      return;
    }

    createVisualizer(canvasRef.current, player);
    return cleanup;
  });

  return <>
    <Start player={player} />
    <canvas ref={canvasRef} />
  </>;
}