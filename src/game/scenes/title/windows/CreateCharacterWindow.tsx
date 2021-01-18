import {Button, Dialog, DialogTitle, Input}         from "@material-ui/core";
import {Field, Form, Formik}                        from "formik";
import React                                        from "react";
import {getLoadCharacters, useCharacters}           from "../../../stores/lobby/characters.store";
import PaddedDiv                                    from "../../../styled/PaddedDiv";
import {getType, useServers}                        from "../../../stores/lobby/servers.store";
import {useAccount}                                 from "../../../stores/lobby/account.store";
import {createRemoteCharacter, getRemoteCharacters} from "../../../api/characters";


const CreateCharacterWindow = ({onBack}: { onBack: () => void }) => {
  const type = useServers(getType);
  const {account} = useAccount();
  const loadCharacters = useCharacters(getLoadCharacters);
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
          const apiType = type === 'mmo' ? 'remote' : 'local';
          if (type === 'offline') {
            createRemoteCharacter(apiType, account!, {
              name: values.name,
              gender: values.gender,
              race: values.race
            }).then(() => {
              getRemoteCharacters(apiType, account!).then(loadCharacters);
            })
          }
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
