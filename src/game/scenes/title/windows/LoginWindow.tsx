import React                 from "react";
import {Field, Form, Formik} from "formik";
import {Button, Input}       from "@material-ui/core";
import "./windows.scss";

const LoginWindow = ({onLogin, register, server}: { onLogin: (user: any) => void, register: () => void, server: string }) => {

  return <div className="window login">
    <strong>Login</strong>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={values => {
        console.log('Submit', values);
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
