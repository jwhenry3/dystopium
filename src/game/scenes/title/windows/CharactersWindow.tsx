import React, {useEffect, useState}                 from "react";
import {Button, Paper}                              from "@material-ui/core";
import {CharacterData, useCharacters}               from "../../../stores/lobby/characters.store";
import styled                                       from "@emotion/styled";
import {getTypeAndActions, useServers}              from "../../../stores/lobby/servers.store";
import {useAccount}                                 from "../../../stores/lobby/account.store";
import {getChangeScene, useSceneData}               from "../../../stores/game/scene.store";
import {deleteRemoteCharacter, getRemoteCharacters} from "../../../api/characters";

const CharacterList = styled('div')`
  .character {
    border: 1.5px solid #ccc;
    border-radius: 16px;
    font-size: 16px;
    &.selected {
      border: 1.5px solid indigo;
    }
  }
`;
const CharactersWindow = ({onCreate}: { onCreate: () => void }) => {
  const {changeServer, type, changeType} = useServers(getTypeAndActions);
  const {account, changeAccount} = useAccount();
  const {characters, changeCharacter, loadCharacters} = useCharacters();
  const changeScene = useSceneData(getChangeScene);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  const apiType = type === 'mmo' ? 'remote' : 'local';
  useEffect(() => {
    getRemoteCharacters(apiType, account!).then(loadCharacters);
  }, [apiType, account, loadCharacters]);
  const onBack = () => {
    if (type === 'offline') {
      changeServer(null);
      changeType(null);
      changeAccount(null);
      return;
    }
    changeServer(null);
  };
  const onPlay = () => {
    changeCharacter(selectedCharacter);
    changeScene('example');
  };
  const onDelete = () => {
    setSelectedCharacter(null);
    deleteRemoteCharacter(apiType, account!, selectedCharacter!.identity.name).then(() => {
      getRemoteCharacters(apiType, account!).then(loadCharacters);
    });
  };
  return <Paper>
    <strong>Characters</strong>
    <CharacterList>
      {characters.map((character, index) => (
        <div className={'character ' + (selectedCharacter?.identity.id === character.identity.id ? 'selected' : '')}
             key={index}
             onClick={() => setSelectedCharacter(character)}>
          <div className="character-avatar"/>
          <div className="character-name">{character.identity.name}</div>
        </div>
      ))}
    </CharacterList>
    {selectedCharacter ? <div className="character-actions">
      <Button variant="contained" color="primary" onClick={onPlay}>
        Play
      </Button>
      <Button variant="outlined" onClick={onDelete}>
        Delete
      </Button>
    </div> : <div className="character-actions">
       <Button variant="contained" color="primary" onClick={onCreate}>
         Create Character
       </Button>
     </div>}
    <Button color="primary" onClick={selectedCharacter ? (() => setSelectedCharacter(null)) : onBack}>
      Back
    </Button>
  </Paper>;
};

export default CharactersWindow;
