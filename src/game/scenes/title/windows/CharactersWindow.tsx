import React, {useCallback, useState} from "react";
import {Button, Paper}                from "@material-ui/core";
import {CharacterData, useCharacters} from "../../../stores/lobby/characters.store";
import styled                         from "@emotion/styled";
import {useServers}                   from "../../../stores/lobby/servers.store";
import {useAccount}                   from "../../../stores/lobby/account.store";
import {useSceneData}                 from "../../../stores/game/scene.store";

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
  const {changeServer, type, changeType} = useServers(useCallback(({changeServer, type, changeType}) => ({
    changeServer,
    type,
    changeType
  }), []));
  const {changeAccount} = useAccount(useCallback(({changeAccount}) => ({changeAccount}), []));
  const {characters, changeCharacter} = useCharacters(useCallback(({characters, changeCharacter}) => ({
    characters,
    changeCharacter
  }), []));
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  const {changeScene} = useSceneData(useCallback(({changeScene}) => ({changeScene}), []));
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
      <Button variant="outlined">
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
