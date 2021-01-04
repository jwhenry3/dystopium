import {Component, ComponentType, createContext, FC} from "react";
import {GameState}                                   from "./state.models";

const defaultGameState         = {
  scene          : 'title',
  friends        : {},
  party          : undefined,
  players        : {},
  playerLocations: {}
};
export const GameStateContext  = createContext<GameState>(defaultGameState);
export const GameStateProvider = (props: any) => {
  return <GameStateContext.Provider value={defaultGameState}>
    {props.children}
  </GameStateContext.Provider>
};
export const withGameState     = (Comp: typeof Component | FC | ComponentType<any>) => {
  return (props: any) => <GameStateContext.Consumer>
    {(contexts) => <Comp {...props} {...contexts}/>}
  </GameStateContext.Consumer>
};

export const withPlayer = (Comp: typeof Component | FC | ComponentType<any>) => {
  return (props: { playerId: string } & any) => <GameStateContext.Consumer>
    {(contexts) => <Comp {...props} player={contexts.players[props.playerId]}/>}
  </GameStateContext.Consumer>
};

