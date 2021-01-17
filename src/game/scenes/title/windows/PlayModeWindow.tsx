import {List, MenuItem, Paper} from "@material-ui/core";
import {useServers}            from "../../../stores/lobby/servers.store";
import React, {useCallback}    from "react";
import {useAccount}            from "../../../stores/lobby/account.store";

const PlayModeWindow = () => {
  const {changeType, changeServer} = useServers(useCallback(({changeType, changeServer}) => ({
    changeType,
    changeServer
  }), []));
  const {changeAccount} = useAccount(useCallback(({changeAccount}) => ({changeAccount}), []));
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
          capacity: 'low'
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
