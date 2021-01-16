import {SceneProps}             from "../props";
import React, {FC, useCallback} from "react";
import Example             from "./example";
import {useSceneLifecycle} from "../../stores/game/scene.store";
import {useCharacters}     from "../../stores/lobby/characters.store";
import {useServers}             from "../../stores/lobby/servers.store";

const ExampleScene: FC<SceneProps> = ({onScene}: SceneProps) => {
  const {changeServer} = useServers();
  const {changeCharacter} = useCharacters();
  const factory = useCallback(() => new Example(), []);
  const onBackToTitle = () => {
    changeCharacter(null);
    changeServer(null);
    onScene('title');
  };
  useSceneLifecycle('example', factory);
  return <div className="scene example">
    <div>Example Works!</div>
    <div className="ui">
      <button onClick={onBackToTitle}>To Title</button>
    </div>
  </div>;
};

export default ExampleScene;
