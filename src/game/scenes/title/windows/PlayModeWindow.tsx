import {List, MenuItem, Paper}        from "@material-ui/core";
import {getServerActions, useServers} from "../../../stores/lobby/servers.store";
import React, {useEffect}             from "react";
import {getChangeAccount, useAccount} from "../../../stores/lobby/account.store";
import {addUser}                      from "../../../../server/server.worker";

const PlayModeWindow = () => {
  const {changeType, changeServer} = useServers(getServerActions);
  const changeAccount = useAccount(getChangeAccount);
  useEffect(() => {
    // for now just default to offline
    addUser('LOCAL:ME').then(() => {
      changeType('offline');
      changeServer({
        name: 'Offline Play',
        url: '',
        https: false,
        status: 'online',
        capacity: 'low',
        host: 'Me'
      });
      changeAccount({
        id: 'offline',
        username: 'LOCAL:ME'
      });
    });
  }, [changeType, changeServer, changeAccount]);
  return <Paper>
    <strong>Play Mode</strong>
    <List>
      <MenuItem onClick={() => {
        changeType('offline');
        changeServer({
          name: 'Offline Play',
          url: '',
          https: false,
          status: 'online',
          capacity: 'low',
          host: 'Me'
        });
        changeAccount({
          id: 'offline',
          username: 'My Offline Account'
        });
      }}>
        Offline
      </MenuItem>
      <MenuItem onClick={() => changeType('lobby')}>
        Host / Join
      </MenuItem>
      <MenuItem onClick={() => changeType('mmo')}>
        MMO
      </MenuItem>
    </List>
  </Paper>;
};

export default PlayModeWindow;
