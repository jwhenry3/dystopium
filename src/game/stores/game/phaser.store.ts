import create, {State}               from "zustand";
import {MutableRefObject, useEffect} from "react";

export interface PhaserState extends State {
  game: Phaser.Game | null
  setGame: (game: Phaser.Game | null) => void
}

export const usePhaser = create<PhaserState>((set): PhaserState => ({
  game: null,
  setGame: (game: Phaser.Game | null) => set({game})
}));


export function usePhaserLifecycle(ref: MutableRefObject<HTMLCanvasElement | null>): PhaserState {
  const phaser = usePhaser();
  useEffect(() => {
    if (!phaser.game && ref.current) {
      const newGame = new Phaser.Game({
        type: Phaser.CANVAS,
        canvas: ref.current,
        scale: {
          mode: Phaser.Scale.RESIZE
        },
        physics: {
          default: 'arcade',
          arcade: {
            fps: 30
          }
        },
        scene: []
      });
      phaser.setGame(newGame);
    }
    return () => {
      if (phaser.game) {
        (phaser.game as Phaser.Game).destroy(false, true);
      }
    };
  }, [ref, phaser]);
  return phaser;
}
