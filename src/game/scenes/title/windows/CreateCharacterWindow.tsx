import {Button, Dialog, DialogTitle, Input} from "@material-ui/core";
import {Field, Form, Formik}                from "formik";
import React                                from "react";
import {useCharacters}                      from "../../../stores/lobby/characters.store";
import {PlayerEquipment}                    from "../../../stores/shared/state.models";
import {PlayerIdentity}                     from "../../../stores/shared/state.models";
import PaddedDiv                            from "../../../styled/PaddedDiv";

const CreateCharacterWindow = ({onBack}: { onBack: () => void }) => {
  const {characters, loadCharacters} = useCharacters();
  return <Dialog onClose={onBack} open={true}>
    <DialogTitle>Create Character</DialogTitle>
    <PaddedDiv>
      <Formik
        initialValues={{
          name: '',
          gender: 'male',
          race: 'human'
        }}
        onSubmit={values => {
          console.log('Submit', values);
          loadCharacters([
            ...characters,
            {
              identity: {
                id: 'test',
                name: values.name,
                gender: values.gender,
                race: values.race,
                level: 1,
                map: 'tutorial'
              } as PlayerIdentity,
              equipment: {
                weapons: [null],
                head: null,
                neck: null,
                chest: null,
                hands: null,
                waist: null,
                legs: null,
                feet: null,
                back: null,
                leftRing: null,
                rightRing: null
              } as PlayerEquipment
            }
          ]);
          onBack();
        }}>
        <Form autoComplete="off" noValidate>
          <Field name="name" as={Input} placeholder="Name"/><br/>
          <Field name="race" as={Input} placeholder="Race"/><br/>
          <Field name="gender" as={Input} placeholder="Gender"/><br/>
          <Button variant="contained" color="primary" type="submit">Create</Button>
        </Form>
      </Formik>
      <Button onClick={onBack}>Back</Button>
    </PaddedDiv>
  </Dialog>
};

export default CreateCharacterWindow;
