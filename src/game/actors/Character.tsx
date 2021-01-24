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
    },
    update({ scene }) {
      if (sprite.current === null) {
        sprite.current = scene.add.circle(100, 100, 16, Phaser.Display.Color.GetColor32(30, 100, 200, 0.5));
        console.log(scene.physics);
        scene.physics.add.existing(sprite.current);
        return;
      }
      const velocity = { x: 0, y: 0 };
      if (keys.current.w?.isDown) {
        velocity.y = -1;
      }
      if (keys.current.s?.isDown) {
        velocity.y = +1;
      }
      if (keys.current.a?.isDown) {
        velocity.x = -1;
      }
      if (keys.current.d?.isDown) {
        velocity.x = +1;
      }
      const entity = sprite.current as Phaser.GameObjects.Arc;
      let speed = singleSpeed;
      if (velocity.x !== 0 && velocity.y !== 0) {
        speed = diagonalSpeed;
      }
      (entity.body as Phaser.Physics.Arcade.Body).setVelocity(velocity.x * speed, velocity.y * speed);
    },
    destroy() {
      sprite.current?.destroy();
      sprite.current = null;
    }
  });
  return <></>;
}
