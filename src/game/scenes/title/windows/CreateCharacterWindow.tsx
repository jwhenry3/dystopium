import {Button} from "@material-ui/core";

const CreateCharacterWindow = ({onBack}: {onBack: () => void}) => {

  return <div className="window create-character">
    <strong>Create Character</strong>
    <Button onClick={onBack}>Back</Button>
  </div>
};

export default CreateCharacterWindow;
