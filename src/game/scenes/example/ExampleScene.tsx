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
import { useWorld } from "../../stores/game/maps.store";
import { proxy } from "comlink";
import { Character } from "../../actors/character";

const ExampleScene: FC = () => {
  const { changeServer, changeType } = useServers(getServerActions);
  const changeCharacter = useCharacters(getChangeCharacter);
  const changeAccount = useAccount(getChangeAccount);

  const world = useWorld("example");
  const factory = useCallback(() => new Example(), []);
  const { scene, changeScene } = useSceneLifecycle("example", factory);
  const onBackToTitle = useCallback(() => {
    changeAccount(null);
    changeCharacter(null);
    changeServer(null);
    changeType(null);
    changeScene("title");
  }, [changeAccount, changeCharacter, changeServer, changeType, changeScene]);
  useEffect(() => {
    let token = "";
    world.mapWorker
      .subscribe(
        "map:update",
        proxy(
          (
            event,
            data: {
              [key: string]: {
                position?: [number, number];
                velocity?: [number, number];
              };
            }
          ) => {
            for (let name of Object.keys(data)) {
              const update = data[name];
              if (scene?.characters[name]) {
                const body: Character = scene!.characters[name] as any;
                if (update.position) {
                  const [x, y] = update.position;
                  body.nextPosition[0] =
                    typeof x !== "undefined" ? x : body.nextPosition[0];
                  body.nextPosition[1] =
                    typeof y !== "undefined" ? y : body.nextPosition[1];
                  body.moveTo.moveTo(
                    body.nextPosition[0],
                    body.nextPosition[1]
                  );
                }
              }
            }
          }
        )
      )
      .then((_token) => {
        token = _token;
      });
    return () => {
      world.mapWorker.unsubscribe(token);
    };
  }, [world, scene]);
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
