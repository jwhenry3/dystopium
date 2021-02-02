import { io, Socket } from "socket.io-client";
import { DirectionVector } from "./shared/directions";

let connection: Socket;
export function connect() {
  if (connection?.connected) {
    connection.disconnect();
  }
  connection = io("ws://localhost:3001");
}

export function addCharacter(map: string, name: string, x: number, y: number) {
  connection?.emit("map:character:add", map, name, x, y);
}
export function removeCharacter(name: string) {
  connection?.emit("map:character:remove", name);
}

export function moveCharacter(name: string, directions: DirectionVector) {
  connection?.emit("map:character:move", name, directions);
}
export function on(event: string, cb: (data: any) => void) {
  connection?.on(event, cb);
}
export function off(event: string, cb: (data: any) => void) {
  connection?.off(event, cb);
}
