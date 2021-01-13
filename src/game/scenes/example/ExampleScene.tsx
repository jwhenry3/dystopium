import {SceneProps}   from "../props";
import React, {FC}    from "react";
import Example        from "./example";
import SceneContainer from "../../SceneContainer";

const ExampleScene: FC<SceneProps> = ({game, onScene}: SceneProps) => {
  return <SceneContainer sceneFactory={() => new Example()} name="example" game={game}>
    {(scene: Example) => <>
      <div>Example Works!</div>
      <div className="ui">
        <button onClick={() => onScene('title')}>To Title</button>
      </div>
    </>}
  </SceneContainer>
};

export default ExampleScene;
