import { ReactElement, useCallback, useRef } from "react";
import { useSceneData } from "../stores/game/scene.store";
import { useSceneHooks } from "../hooks/use-scene-hooks";
import useKeys from "../hooks/use-keys";
import { Character } from "./character";
import { getDirection } from "../utils/get-direction";
import { DirectionVector } from "../../shared/directions";
import { addCharacter, moveCharacter } from "../../connection";

export default function CharacterComponent(props: {
  name: string;
}): ReactElement {
  const sceneKey = useSceneData(
    useCallback(({ currentScene }) => currentScene, [])
  );
  const sprite = useRef<Character | null>(null);
  const keys = useKeys(sceneKey, ["w", "a", "s", "d"]);
  const directions = useRef<DirectionVector | null>([0, 0]);
  useSceneHooks(sceneKey, {
    create({ scene }) {
      sprite.current = new Character(scene, props.name, 100, 100);
      addCharacter(sceneKey, props.name, 100, 100);
    },
    update({ scene, data }) {
      const [x, y] = getDirection(keys.current);
      const [lastX, lastY] = directions.current as DirectionVector;
      if (lastX !== x || lastY !== y) {
        moveCharacter(props.name, [x, y]);
        directions.current = [x, y];
      }
    },
    destroy() {
      sprite.current?.destroy();
      sprite.current = null;
    },
  });
  return <></>;
}
