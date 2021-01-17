import create, {State} from "zustand";

export interface ServerData {
  url: string;
  name: string;
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

export const useServers = create<ServerState>(set => ({
  server: null,
  type: null,
  servers: [],
  changeServer: (server: ServerData | null) => set({server}),
  changeType: (type) => set({type})
}));
