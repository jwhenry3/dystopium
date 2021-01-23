import React, { useEffect, useState }                 from "react";
import { Button, Dialog, DialogTitle }         from "@material-ui/core";
import { CharacterData, useCharacters }               from "../../../stores/lobby/characters.store";
import styled                                         from "@emotion/styled";
import { getTypeAndActions, useServers }              from "../../../stores/lobby/servers.store";
import { useAccount }                                 from "../../../stores/lobby/account.store";
import { getChangeScene, useSceneData }               from "../../../stores/game/scene.store";
import { deleteRemoteCharacter, getRemoteCharacters } from "../../../api/characters";

const CharacterList = styled.div`
  margin: 12px 0;
  .character {
    border: 1.5px solid transparent;
    border-radius: 4px;
    font-size: 16px;
    min-height: 32px;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor:pointer;
    &:hover {
      border: 1.5px solid rgba(255,255,255, 0.5);
    }
    &.selected {
      border: 1.5px solid white;
    }
  }
`;
const CharacterActions = styled.div`
  padding: 12px;
  margin: 0 -8px;
  > .MuiButtonBase-root {
    margin: 0 8px;
  }
`;
const CharactersWindow = ({ onCreate }: { onCreate: () => void }) => {
  const { changeServer, type, changeType } = useServers(getTypeAndActions);
  const { account, changeAccount } = useAccount();
  const { characters, changeCharacter, loadCharacters } = useCharacters();
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
  return <Dialog onClose={onBack} open={true}>
    <DialogTitle>Characters</DialogTitle>
    <CharacterList>
      {characters.map((character, index) => (
        <div className={'character ' + (selectedCharacter?.identity.id === character.identity.id ? 'selected' : '')}
             key={index}
             onClick={() => setSelectedCharacter(character)}>
          <div className="character-avatar" />
          <div className="character-name">{character.identity.name}</div>
        </div>
      ))}
    </CharacterList>
    <CharacterActions>
      {selectedCharacter ? <>
                           <Button variant="contained" color="primary" onClick={onPlay}>
                             Play
                           </Button>
                           <Button variant="outlined" onClick={onDelete}>
                             Delete
                           </Button>
                         </>
                         : <Button variant="contained" color="primary" onClick={onCreate}>
         Create Character
       </Button>}
    </CharacterActions>
    <Button color="primary" onClick={selectedCharacter ? (() => setSelectedCharacter(null)) : onBack}>
      Back
    </Button>
  </Dialog>;
};

export default CharactersWindow;
