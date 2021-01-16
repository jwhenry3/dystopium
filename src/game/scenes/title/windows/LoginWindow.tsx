import React, {useCallback}  from "react";
import {Field, Form, Formik} from "formik";
import {Button, Input}       from "@material-ui/core";
import "./windows.scss";
import {useServers}          from "../../../stores/servers.store";

const LoginWindow = ({onLogin, register}: { onLogin: (user: any) => void, register: () => void }) => {
  const server = useServers(useCallback(state => state.server, []));
  return <div className="window login">
    <strong>Login</strong>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={values => {
        console.log('Submit', values, server?.name);
        onLogin({
          id: 1,
          username: values.username,
          token: 'abc123'
        })
      }}>
      <Form autoComplete="off" noValidate>
        <Field name="username" as={Input} placeholder="Username"/><br/>
        <Field name="password" type="password" as={Input} placeholder="Password"/><br/>
        <Button variant="contained" color="primary" type="submit">Login</Button>
        <Button color="primary" type="button" onClick={register}>No Account? Register Now!</Button>
      </Form>
    </Formik>
  </div>;
};

export default LoginWindow;
