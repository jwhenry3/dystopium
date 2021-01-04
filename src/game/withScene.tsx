import {Component, ComponentType, FC, useEffect, useState} from "react";

export interface WithSceneProps {
  name: string
  sceneFactory: () => Phaser.Scene
  game: Phaser.Game
}

const withScene = (Comp: typeof Component | FC | ComponentType<{ scene: Phaser.Scene, name: string } & any>) => {
  return ({game, sceneFactory, name, children}: WithSceneProps & any) => {
    const [scene, setScene] = useState<Phaser.Scene | null>(null);
    useEffect(() => {
      if (name) {
        if (game.scene.getKey(name)) {
          game.scene.stop(name);
          game.scene.remove(name);
        }

        let newScene = sceneFactory();
        game.scene.add(name, newScene);

        setScene(newScene);
        game.scene.start(name);
        return () => {
          game.scene.stop(name);
          game.scene.remove(name);
        };
      }
    }, [game.scene, sceneFactory, name]);
    return <Comp scene={scene} name={name}>{children}</Comp>;
  }
};

export default withScene;
