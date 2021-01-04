import {SceneProps} from "../props";
import React, {FC}  from "react";

const UnknownScene: FC<SceneProps> = (props: SceneProps) => {
  return <div className="scene not-found">
    Scene not found
  </div>;
};

export default UnknownScene;
