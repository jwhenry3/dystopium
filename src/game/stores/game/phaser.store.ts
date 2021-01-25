import create, { State } from "zustand";
import { MutableRefObject, useEffect, useRef } from "react";

export interface PhaserState extends State {
  game: Phaser.Game | null;
  setGame: (game: Phaser.Game | null) => void;
}

export const usePhaser = create<PhaserState>(
  (set): PhaserState => ({
    game: null,
    setGame: (game: Phaser.Game | null) => set({ game }),
  })
);

function getConfig(canvas: HTMLCanvasElement): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.WEBGL,
    canvas,
    scale: {
      mode: Phaser.Scale.RESIZE,
    },
    physics: {
      default: "arcade",
      arcade: {
        fps: 30,
      },
    },
  } as Phaser.Types.Core.GameConfig;
}

export function usePhaserLifecycle(
  ref: MutableRefObject<HTMLCanvasElement | null>
): PhaserState {
  const { game, setGame } = usePhaser();
  const currentGame = useRef<Phaser.Game | null>(null);
  useEffect(() => {
    if (!currentGame.current && ref.current) {
      currentGame.current = new Phaser.Game(getConfig(ref.current));
      setGame(currentGame.current);
    }
    return () => {
      (currentGame.current as Phaser.Game)?.destroy(false, true);
      setGame(null);
    };
  }, [ref, setGame]);
  return { game, setGame };
}
