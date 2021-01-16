import {Button, Input}       from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import React             from "react";
import {useCharacters}   from "../../../stores/lobby/characters.store";
import {PlayerEquipment} from "../../../state.models";
import {PlayerIdentity}      from "../../../state.models";

const CreateCharacterWindow = ({onBack}: { onBack: () => void }) => {
  const {characters, loadCharacters} = useCharacters();
  return <div className="window create-character">
    <strong>Create Character</strong>
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
  </div>
};

export default CreateCharacterWindow;
