import {SceneProps}                    from "../props";
import React, {FC, Fragment, useState} from "react";
import SceneContainer                  from "../../SceneContainer";
import Title                           from "./title";
import LoginWindow                     from "./windows/LoginWindow";
import ServerWindow                    from "./windows/ServerWindow";
import RegisterWindow                  from "./windows/RegisterWindow";
import CharactersWindow                from "./windows/CharactersWindow";
import CreateCharacterWindow           from "./windows/CreateCharacterWindow";

const NoUser = ({server, onLogin}: { server: string, onLogin: (user: any) => void }) => {
  const [view, setView] = useState('login');
  if (view === 'login')
    return <LoginWindow server={server} onLogin={onLogin} register={() => setView('register')}/>;
  return <RegisterWindow server={server} login={() => setView('login')} onRegister={onLogin}/>
};
const TitleScene: FC<SceneProps> = ({game, onScene}: SceneProps) => {
  const [server, setServer] = useState('');
  const [user, setUser] = useState<any>(null);
  const [character, setCharacter] = useState<any>(null);
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const render = (scene: Title) => {
    if (!server)
      return <ServerWindow onServer={setServer}/>;
    if (!user)
      return <NoUser server={server} onLogin={setUser}/>;
    if (!character)
      return (<Fragment>
        <CharactersWindow onSelect={setCharacter}
                          onBack={() => setUser(null)}
                          onCreate={() => setShowCreate(true)}/>
        {showCreate ? <CreateCharacterWindow onBack={() => setShowCreate(false)}/> : ''}
      </Fragment>);
  };
  return <SceneContainer sceneFactory={() => new Title()} name="title" game={game}>
    {render}
  </SceneContainer>
};

export default TitleScene;
