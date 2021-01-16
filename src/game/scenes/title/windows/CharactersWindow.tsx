import {useState}                     from "react";
import {Button}                       from "@material-ui/core";
import "./CharactersWindow.scss";
import {CharacterData, useCharacters} from "../../../stores/characters.store";

const CharactersWindow = ({onBack, onCreate}: { onBack: () => void, onCreate: () => void }) => {
  const {characters, changeCharacter} = useCharacters();
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterData | null>(null);
  return <div className="window characters">
    <strong>Characters</strong>
    <div className="character-list">
      {characters.map((character, index) => (
        <div className={'character ' + (selectedCharacter?.identity.id === character.identity.id ? 'selected' : '')}
             key={index}
             onClick={() => setSelectedCharacter(character)}>
          <div className="character-avatar"/>
          <div className="character-name">{character.identity.name}</div>
        </div>
      ))}
    </div>
    {selectedCharacter ? <div className="character-actions">
      <Button variant="contained" color="primary" onClick={() => changeCharacter(selectedCharacter)}>
        Play
      </Button>
      <Button variant="outlined">
        Delete
      </Button>
      <Button color="primary" onClick={() => setSelectedCharacter(null)}>
        Cancel
      </Button>
    </div> : <div className="character-actions">
       <Button variant="contained" color="primary" onClick={onCreate}>
         Create Character
       </Button>
       <Button color="primary" onClick={onBack}>
         Cancel
       </Button>
     </div>}
  </div>;
};

export default CharactersWindow;
