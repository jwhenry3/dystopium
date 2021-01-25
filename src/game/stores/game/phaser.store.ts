import create, { State } from "zustand";
import { MutableRefObject, useEffect } from "react";

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
  const phaser = usePhaser();
  useEffect(() => {
    if (!phaser.game && ref.current) {
      const newGame = new Phaser.Game(getConfig(ref.current));
      phaser.setGame(newGame);
    }
    return () => {
      (phaser.game as Phaser.Game)?.destroy(false, true);
      phaser.setGame(null);
    };
  }, [ref, phaser]);
  return phaser;
}
