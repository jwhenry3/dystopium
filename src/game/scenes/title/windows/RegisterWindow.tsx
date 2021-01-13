import {Field, Form, Formik}      from "formik";
import {Button, Input} from "@material-ui/core";
import React                      from "react";

const RegisterWindow = ({login, onRegister, server}: { login: () => void, onRegister: (user: any) => void, server: string }) => {

  return <div className="window register">
    <strong>Register</strong>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={values => {
        console.log('Submit', values);
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
