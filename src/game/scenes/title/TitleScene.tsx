import {SceneProps}                                 from "../props";
import React, {FC, Fragment, useCallback, useState} from "react";
import Title                                        from "./title";
import LoginWindow                                  from "./windows/LoginWindow";
import ServerWindow                                 from "./windows/ServerWindow";
import RegisterWindow                               from "./windows/RegisterWindow";
import CharactersWindow                             from "./windows/CharactersWindow";
import CreateCharacterWindow                        from "./windows/CreateCharacterWindow";
import {useSceneLifecycle}                          from "../../stores/scene.store";

const NoUser = ({server, onLogin}: { server: string, onLogin: (user: any) => void }) => {
  const [view, setView] = useState('login');
  if (view === 'login')
    return <LoginWindow server={server} onLogin={onLogin} register={() => setView('register')}/>;
  return <RegisterWindow server={server} login={() => setView('login')} onRegister={onLogin}/>
};
const TitleScene: FC<SceneProps> = ({onScene}: SceneProps) => {
  const factory = useCallback(() => new Title(), []);
  const scene = useSceneLifecycle('title', factory);
  const [server, setServer] = useState('');
  const [user, setUser] = useState<any>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const onSelectCharacter = useCallback((character: any) => {
    onScene('example');
  }, [ onScene]);
  return <div className="scene title">
    {!server && <ServerWindow onServer={setServer}/>}
    {server && !user && <NoUser server={server} onLogin={setUser}/>}
    {server && user && (<Fragment>
      <CharactersWindow onSelect={onSelectCharacter}
                        onBack={() => setUser(null)}
                        onCreate={() => setShowCreate(true)}/>
      {showCreate && <CreateCharacterWindow onBack={() => setShowCreate(false)}/>}
    </Fragment>)}
  </div>;
};

export default TitleScene;
