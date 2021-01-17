import React, {FC, Fragment, useCallback, useState} from "react";
import Title                                        from "./title";
import LoginWindow                                  from "./windows/LoginWindow";
import ServerWindow                                 from "./windows/ServerWindow";
import RegisterWindow                               from "./windows/RegisterWindow";
import CharactersWindow                             from "./windows/CharactersWindow";
import CreateCharacterWindow                        from "./windows/CreateCharacterWindow";
import {useSceneLifecycle}                          from "../../stores/game/scene.store";
import {useServers}                                 from "../../stores/lobby/servers.store";
import PlayModeWindow                               from "./windows/PlayModeWindow";
import {useAccount}                                 from "../../stores/lobby/account.store";

const NoUser = ({onLogin}: { onLogin: (user: any) => void }) => {
  const [view, setView] = useState('login');
  if (view === 'login')
    return <LoginWindow onLogin={onLogin} register={() => setView('register')}/>;
  return <RegisterWindow login={() => setView('login')} onRegister={onLogin}/>
};
const TitleScene: FC = () => {
  const {server, type} = useServers(useCallback(({server, changeServer, type}) => ({
    server,
    changeServer,
    type,
  }), []));
  const factory = useCallback(() => new Title(), []);
  useSceneLifecycle('title', factory);
  const {account, changeAccount} = useAccount();


  // lobby flow for getting into the game
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const render = () => {
    if (!type)
      return <PlayModeWindow/>;
    if (!account)
      return <NoUser onLogin={changeAccount}/>;
    if (!server)
      return <ServerWindow/>;
    return (<Fragment>
      <CharactersWindow onCreate={() => setShowCreate(true)}/>
      {showCreate && <CreateCharacterWindow onBack={() => setShowCreate(false)}/>}
    </Fragment>);
  };

  return <div className="scene title">
    {render()}
  </div>;
};

export default TitleScene;
