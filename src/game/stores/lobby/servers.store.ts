import create, {State} from "zustand";

export interface ServerData {
  url: string;
  name: string;
  https: boolean;
  host: string;
  status: 'online' | 'offline';
  capacity: 'full' | 'high' | 'medium' | 'low';
}

export interface ServerState extends State {
  server: ServerData | null;
  type: 'offline' | 'lobby' | 'mmo' | null;
  servers: ServerData[];
  changeServer: (server: ServerData | null) => void;
  changeType: (mode: 'offline' | 'lobby' | 'mmo' | null) => void;
}
export const getType = ({type}:ServerState) => type;
export const getServerAndType = ({server, type}: ServerState) => ({
  server,
  type,
});
export const getServerActions = ({changeServer, changeType}: ServerState) => ({
  changeServer,
  changeType
});
export const getTypeAndActions = ({changeServer, type, changeType}: ServerState) => ({
  type,
  changeServer,
  changeType
});
export const getServerAndActions = ({changeServer, server, changeType}: ServerState) => ({
  server,
  changeServer,
  changeType
});
export const useServers = create<ServerState>(set => ({
  server: null,
  type: null,
  servers: [
    {
      name: 'Test Server',
      url: 'localhost:3000',
      https: false,
      status: 'online',
      capacity: 'low',
      host: 'Someone Else'
    }
  ],
  changeServer: (server: ServerData | null) => set({server}),
  changeType: (type) => set({type})
}));
