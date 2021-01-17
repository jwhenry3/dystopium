import React, {FC, useCallback} from "react";
import Example                  from "./example";
import {useSceneLifecycle}      from "../../stores/game/scene.store";
import {useCharacters}          from "../../stores/lobby/characters.store";
import {useServers}             from "../../stores/lobby/servers.store";
import {useAccount}             from "../../stores/lobby/account.store";

const ExampleScene: FC = () => {
  const {changeServer, changeType} = useServers(useCallback(({changeServer, changeType}) => ({
    changeServer,
    changeType
  }), []));
  const {changeCharacter} = useCharacters(useCallback(({changeCharacter}) => ({changeCharacter}), []));
  const {changeAccount} = useAccount(useCallback(({changeAccount}) => ({changeAccount}), []));

  const factory = useCallback(() => new Example(), []);
  const {changeScene} = useSceneLifecycle('example', factory);
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
      <button onClick={onBackToTitle}>To Title</button>
    </div>
  </div>;
};

export default ExampleScene;
