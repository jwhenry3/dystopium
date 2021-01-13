import {List, MenuItem} from "@material-ui/core";

const ServerWindow = ({onServer}: { onServer: (server: string) => void }) => {

  return <div className="window server">
    <strong>Servers</strong>
    <List>
      <MenuItem onClick={() => onServer('test')}>
        Test Server
      </MenuItem>
    </List>
  </div>;
};

export default ServerWindow;
