import {Component, ComponentType, createContext, FC, useState} from "react";

export interface PhaserState {
  game: Phaser.Game | null
  setGame: (game: Phaser.Game | null) => void
}

export const PhaserProvider = (props: any) => {
  const [game, setGame] = useState<Phaser.Game | null>(null);
  return <PhaserContext.Provider value={{game, setGame: (game: Phaser.Game | null) => setGame(game)}}>
    {props.children}
  </PhaserContext.Provider>
};
export const withPhaser     = (Comp: typeof Component | FC | ComponentType<any>) => {
  return (props: PhaserState & any) => <PhaserContext.Consumer>
    {(contexts) => <Comp {...props} game={contexts.game} setGame={contexts.setGame}/>}
  </PhaserContext.Consumer>
};
export const PhaserContext  = createContext<PhaserState>({game: null, setGame: () => null});
