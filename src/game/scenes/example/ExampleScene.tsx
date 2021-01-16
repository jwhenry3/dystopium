import {SceneProps}             from "../props";
import React, {FC, useCallback} from "react";
import Example                  from "./example";
import {useSceneLifecycle}      from "../../stores/scene.store";

const ExampleScene: FC<SceneProps> = ({onScene}: SceneProps) => {
  const factory = useCallback(() => new Example(), []);
  const scene = useSceneLifecycle('example', factory);
  return <div className="scene example">
    <div>Example Works!</div>
    <div className="ui">
      <button onClick={() => onScene('title')}>To Title</button>
    </div>
  </div>;
};

export default ExampleScene;
