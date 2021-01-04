import withScene                     from "./withScene";
import {FC, ReactElement, ReactNode} from "react";

export interface SceneContainerProps {
  scene: Phaser.Scene
  name: string
  children: (scene: Phaser.Scene) => ReactNode
}

const SceneContainer: FC<SceneContainerProps> = (props: SceneContainerProps): ReactElement => {
  return <div className={'scene ' + props.name}>{props.children ? props.children(props.scene) : ''}</div>;
};

export default withScene(SceneContainer);
