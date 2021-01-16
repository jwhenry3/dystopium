import {List, MenuItem} from "@material-ui/core";
import {useServers}     from "../../../stores/lobby/servers.store";

const ServerWindow = () => {
  const {servers, changeServer} = useServers();
  return <div className="window server">
    <strong>Servers</strong>
    <List>
      {servers.map((server, index) => (
        <MenuItem onClick={() => changeServer(server)} key={index}>
          {server.name}
        </MenuItem>
      ))}
    </List>
  </div>;
};

export default ServerWindow;
