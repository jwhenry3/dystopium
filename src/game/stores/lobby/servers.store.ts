import create, {State} from "zustand";

export interface ServerData {
  url: string;
  name: string;
  https: boolean;
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
  servers: [
    {
      name: 'Test Server',
      url: 'localhost:3000',
      https: false,
      status: 'online',
      capacity: 'low'
    }
  ],
  changeServer: (server: ServerData | null) => set({server}),
  changeType: (type) => set({type})
}));
