import { ReactElement, useRef } from "react";
import { useSceneData }         from "../stores/game/scene.store";
import { useSceneHooks }        from "../scenes/use-scene-hooks";
import useKeys                  from "../scenes/use-keys";
import { GameRules }            from "../rules";

const singleSpeed = GameRules.speed;
const diagonalSpeed = singleSpeed / 1.41;

export default function Character(): ReactElement {
  const sceneKey = useSceneData(({ currentScene }) => currentScene);
  const sprite = useRef<Phaser.GameObjects.Arc | null>(null);
  const keys = useKeys(sceneKey, ['w', 'a', 's', 'd']);
  useSceneHooks(sceneKey, {
    create({ scene }) {
      sprite.current = scene.add.circle(100, 100, 16, Phaser.Display.Color.GetColor32(30, 100, 200, 0.5));
    },
    update(hook) {
      if (sprite.current !== null) {
        let speed = singleSpeed;
        if (keys.current.w?.isDown || keys.current.s?.isDown) {
          if (keys.current.a?.isDown || keys.current.d?.isDown) {
            speed = diagonalSpeed;
          }
        }
        if (keys.current.w?.isDown) {
          (sprite.current as Phaser.GameObjects.Arc).setPosition(sprite.current.x, sprite.current.y - speed);
        }
        if (keys.current.s?.isDown) {
          (sprite.current as Phaser.GameObjects.Arc).setPosition(sprite.current.x, sprite.current.y + speed);
        }
        if (keys.current.a?.isDown) {
          (sprite.current as Phaser.GameObjects.Arc).setPosition(sprite.current.x - speed, sprite.current.y);
        }
        if (keys.current.d?.isDown) {
          (sprite.current as Phaser.GameObjects.Arc).setPosition(sprite.current.x + speed, sprite.current.y);
        }
      }
    },
    destroy() {
      sprite.current?.destroy();
    }
  });
  return <></>;
}
