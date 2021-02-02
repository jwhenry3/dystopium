import React, { FC, useCallback, useEffect } from "react";
import Example from "./example";
import { useSceneLifecycle } from "../../stores/game/scene.store";
import {
  getChangeCharacter,
  useCharacters,
} from "../../stores/lobby/characters.store";
import { getServerActions, useServers } from "../../stores/lobby/servers.store";
import { getChangeAccount, useAccount } from "../../stores/lobby/account.store";
import { Button } from "@material-ui/core";
import CharacterComponent from "../../actors/CharacterComponent";
import { proxy } from "comlink";
import { BaseScene } from "../base-scene";
import { off, on } from "../../../connection";

const updateCharacter = (scene: BaseScene, name: string, update: any) => {
  if (update.position) {
    scene.characters[name]?.setNextPosition(
      ...(update.position as [number, number])
    );
  }
};
const ExampleScene: FC = () => {
  const { changeServer, changeType } = useServers(getServerActions);
  const changeCharacter = useCharacters(getChangeCharacter);
  const changeAccount = useAccount(getChangeAccount);

  const factory = useCallback(() => new Example(), []);
  const { scene, changeScene } = useSceneLifecycle("example", factory);
  const onBackToTitle = useCallback(() => {
    changeAccount(null);
    changeCharacter(null);
    changeServer(null);
    changeType(null);
    changeScene("title");
  }, [changeAccount, changeCharacter, changeServer, changeType, changeScene]);

  const onUpdate = useCallback(
    (data: {
      [key: string]: {
        position?: [number, number];
        velocity?: [number, number];
      };
    }) => {
      Object.keys(data).map(async (name) => {
        updateCharacter(scene!, name, data[name]);
      });
    },
    [scene]
  );
  useEffect(() => {
    on("example:map:update", onUpdate);
    return () => {
      off("example:map:update", onUpdate);
      scene?.destroy();
    };
  }, [scene]);
  return (
    <div className="scene example">
      <div>Example Works!</div>
      <div className="ui">
        <Button variant="contained" onClick={onBackToTitle}>
          To Title
        </Button>
        <CharacterComponent name="test" />
      </div>
    </div>
  );
};

export default ExampleScene;
