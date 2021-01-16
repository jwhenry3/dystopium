import create, {State} from "zustand";

export interface ServerData {
  url: string;
  name: string;
  status: 'online' | 'offline';
  capacity: 'full' | 'high' | 'medium' | 'low';
}

export interface ServerState extends State {
  server: ServerData | null;
  servers: ServerData[];
  changeServer: (server: ServerData | null) => void;
}

export const useServers = create<ServerState>(set => ({
  server: null,
  servers: [
    {
      name: 'Test Server',
      url: 'ws://localhost:3000',
      status: 'online',
      capacity: 'low'
    }
  ],
  changeServer: (server: ServerData | null) => set({server})
}));
