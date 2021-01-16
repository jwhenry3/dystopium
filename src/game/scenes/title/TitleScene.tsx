import {SceneProps}                                            from "../props";
import React, {FC, Fragment, useCallback, useEffect, useState} from "react";
import Title                                                   from "./title";
import LoginWindow                                             from "./windows/LoginWindow";
import ServerWindow                                            from "./windows/ServerWindow";
import RegisterWindow                                          from "./windows/RegisterWindow";
import CharactersWindow                                        from "./windows/CharactersWindow";
import CreateCharacterWindow                                   from "./windows/CreateCharacterWindow";
import {useSceneLifecycle}                                     from "../../stores/scene.store";
import {useServers}                                            from "../../stores/servers.store";
import {useCharacters}                                         from "../../stores/characters.store";

const NoUser = ({onLogin}: { onLogin: (user: any) => void }) => {
  const [view, setView] = useState('login');
  if (view === 'login')
    return <LoginWindow onLogin={onLogin} register={() => setView('register')}/>;
  return <RegisterWindow login={() => setView('login')} onRegister={onLogin}/>
};
const TitleScene: FC<SceneProps> = ({onScene}: SceneProps) => {
  const {server, changeServer} = useServers();
  useCharacters(useCallback(state => {
    if (state.character) {
      onScene('example');
    }
  }, [onScene]));
  const factory = useCallback(() => new Title(), []);
  useSceneLifecycle('title', factory);
  useEffect(() => {
    changeServer(null);
  }, [changeServer]);
  // lobby flow for getting into the game
  const [user, setUser] = useState<any>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);


  return <div className="scene title">
    {!server && <ServerWindow/>}
    {server && !user && <NoUser onLogin={setUser}/>}
    {server && user && (<Fragment>
      <CharactersWindow onBack={() => setUser(null)}
                        onCreate={() => setShowCreate(true)}/>
      {showCreate && <CreateCharacterWindow onBack={() => setShowCreate(false)}/>}
    </Fragment>)}
  </div>;
};

export default TitleScene;
