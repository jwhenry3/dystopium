import React, { FC, useCallback }            from "react";
import Example                               from "./example";
import { useSceneLifecycle }                 from "../../stores/game/scene.store";
import { getChangeCharacter, useCharacters } from "../../stores/lobby/characters.store";
import { getServerActions, useServers }      from "../../stores/lobby/servers.store";
import { getChangeAccount, useAccount }      from "../../stores/lobby/account.store";
import { Button }                            from "@material-ui/core";
import CharacterComponent                             from "../../actors/CharacterComponent";


const ExampleScene: FC = () => {
  const { changeServer, changeType } = useServers(getServerActions);
  const changeCharacter = useCharacters(getChangeCharacter);
  const changeAccount = useAccount(getChangeAccount);

  const factory = useCallback(() => new Example(), []);
  const { changeScene } = useSceneLifecycle('example', factory);
  const onBackToTitle = useCallback(() => {
    changeAccount(null);
    changeCharacter(null);
    changeServer(null);
    changeType(null);
    changeScene('title');
  }, [changeAccount, changeCharacter, changeServer, changeType, changeScene]);
  return <div className="scene example">
    <div>Example Works!</div>
    <div className="ui">
      <Button variant="contained" onClick={onBackToTitle}>To Title</Button>
      <CharacterComponent />
    </div>
  </div>;
};

export default ExampleScene;
