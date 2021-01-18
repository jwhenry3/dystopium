import {Field, Form, Formik}             from "formik";
import {Button, Input, Paper}            from "@material-ui/core";
import React                             from "react";
import {getServerAndActions, useServers} from "../../../stores/lobby/servers.store";

const RegisterWindow = ({login, onRegister}: { login: () => void, onRegister: (user: any) => void }) => {

  const {server, changeType} = useServers(getServerAndActions);
  return <Paper>
    <strong>Register</strong>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={values => {
        console.log('Submit', values, server?.name);
        onRegister({
          id: 1,
          username: values.username,
          token: 'abc123'
        })
      }}>
      <Form>
        <Field name="username" as={Input} placeholder="Username"/><br/>
        <Field name="password" type="password" as={Input} placeholder="Password"/><br/>
        <Field name="confirmPassword" type="password" as={Input} placeholder="Confirm Password"/><br/>
        <Button variant="contained" color="primary" type="submit">Register</Button>
        <Button color="primary" type="button" onClick={login}>Have an Account? Login Now!</Button>
      </Form>
    </Formik>
    <Button variant="outlined" onClick={() => {
      changeType(null);
    }}>
      Back
    </Button>
  </Paper>;
};

export default RegisterWindow;
