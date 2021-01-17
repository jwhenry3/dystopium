import {Button, Input, List, MenuItem, Paper, Tab, Tabs} from "@material-ui/core";
import {useServers}                                      from "../../../stores/lobby/servers.store";
import React, {useCallback, useState}                    from "react";
import {Field, Form, Formik}                             from "formik";
import PaddedDiv                                         from "../../../styled/PaddedDiv";
import {useAccount}                                      from "../../../stores/lobby/account.store";

const ServerWindow = () => {
  const {servers, changeServer, type} = useServers();
  const {changeAccount} = useAccount(useCallback(({changeAccount}) => ({changeAccount}), []));
  const [tab, setTab] = useState(0);
  const onBack = () => {
    changeAccount(null);
  };
  return <Paper>
    <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
      <Tab label={type === 'lobby' ? 'Join Server' : 'MMO Servers'}/>
      {type === 'lobby' ? <Tab label="Host"/> : ''}
    </Tabs>
    {tab === 0 ? <List>
                 {servers.map((server, index) => (
                   <MenuItem onClick={() => changeServer(server)} key={index}>
                     {server.name} {type === 'lobby' ? ' (Host:' + server.host + ')' : ''}
                   </MenuItem>
                 ))}
               </List> :
     <PaddedDiv>
       <Formik
         initialValues={{
           name: ''
         }}
         onSubmit={values => {
           console.log('Submit', values);
         }}>
         <Form autoComplete="off" noValidate>
           <Field name="name" as={Input} placeholder="Server Name"/><br/>
           <Button variant="contained" color="primary" type="submit">Host</Button>
         </Form>
       </Formik>
     </PaddedDiv>}
    <Button variant="outlined" onClick={onBack}>
      Back
    </Button>
  </Paper>;
};

export default ServerWindow;
