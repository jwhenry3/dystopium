import {SceneProps} from "../props";
import React, {FC}  from "react";

const TitleScene: FC<SceneProps> = (props: SceneProps) => {
  return <div className="scene title">
    <h3>Yay a title!</h3>
    <div className="ui">
      <button onClick={() => props.onScene('example')}>Continue</button>
    </div>
  </div>;
};

export default TitleScene;
