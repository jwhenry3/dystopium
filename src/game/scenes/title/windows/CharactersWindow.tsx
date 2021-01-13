import {useState} from "react";
import {Button}   from "@material-ui/core";
import "./CharactersWindow.scss";

const CharactersWindow = ({onSelect, onBack, onCreate}: { onSelect: (character: any) => void, onBack: () => void, onCreate: () => void }) => {

  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  return <div className="window characters">
    <strong>Characters</strong>
    <div className="character-list">
      <div className={'character ' + (selectedCharacter?.id === 1 ? 'selected' : '')}
           onClick={() => setSelectedCharacter({id: 1, name: 'Test Character'})}>
        <div className="character-avatar"/>
        <div className="character-name">Test Character</div>
      </div>
    </div>
    {selectedCharacter ? <div className="character-actions">
      <Button variant="contained" color="primary" onClick={() => onSelect(selectedCharacter)}>
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
