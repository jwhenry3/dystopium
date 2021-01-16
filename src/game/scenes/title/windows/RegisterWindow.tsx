import {Field, Form, Formik} from "formik";
import {Button, Input}       from "@material-ui/core";
import React, {useCallback}  from "react";
import {useServers}          from "../../../stores/servers.store";

const RegisterWindow = ({login, onRegister}: { login: () => void, onRegister: (user: any) => void }) => {

  const server = useServers(useCallback(state => state.server, []));
  return <div className="window register">
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
  </div>;
};

export default RegisterWindow;
