import {SceneProps}   from "../props";
import {FC}           from "react";
import Example        from "./example";
import SceneContainer from "../../SceneContainer";

const ExampleScene: FC<SceneProps> = ({game}: SceneProps) => {
  return <SceneContainer sceneFactory={() => new Example()} name="example" game={game}>
    {(scene: Example) => <div>Example Works!</div>}
  </SceneContainer>
};

export default ExampleScene;
