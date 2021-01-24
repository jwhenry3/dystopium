import { ReactElement, useCallback, useRef } from "react";
import { useSceneData }                      from "../stores/game/scene.store";
import { useSceneHooks }                     from "../scenes/use-scene-hooks";
import useKeys                               from "../scenes/use-keys";
import { Character }                         from "./character";

export default function CharacterComponent(): ReactElement {
  const sceneKey = useSceneData(useCallback(({ currentScene }) => currentScene, []));
  const sprite = useRef<Character | null>(null);
  const keys = useKeys(sceneKey, ["w", "a", "s", "d"]);
  useSceneHooks(sceneKey, {
    create({ scene }) {
      sprite.current = new Character(scene, 100, 100);
    },
    update({ scene, data }) {
      if (sprite.current!.keys) {
        sprite.current!.keys = keys.current;
      }
    },
    destroy() {
      sprite.current?.destroy();
      sprite.current = null;
    },
  });
  return <></>;
}
