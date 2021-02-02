import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { proxy, Remote } from 'comlink';
import { Namespace } from 'socket.io';
import { startMap } from '../map';
import { MapWorker } from '../map-worker';
import { DirectionVector } from './utils/directions';

export interface WorldMap {
  [key: string]: MapWorker;
}
export interface PlayerMap {
  [playerName: string]: string;
}
@WebSocketGateway()
export class MapGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Namespace;

  maps: WorldMap = {};
  players: PlayerMap = {};
  async loadMaps() {
    const maps = ['example'];
    const workers = await Promise.all(maps.map(key => startMap(key)));
    return workers.reduce((acc, worker, i) => {
      acc[maps[i]] = worker;
      console.log('loaded', maps[i]);
      return acc;
    }, {} as WorldMap);
  }
  async afterInit(server: any) {
    this.maps = await this.loadMaps();
    for (let key in this.maps) {
      this.maps[key]!.subscribe('map:update').subscribe(data => {
        this.server.emit(key + ':map:update', data);
      });
    }
  }

  @SubscribeMessage('character:add')
  async addCharacter(map: string, name: string, x: number, y: number) {
    this.players[name] = map;
    await this.maps[map]?.addCharacter(name, x, y);
    this.server.emit(map + ':player:join', { name });
  }
  @SubscribeMessage('character:remove')
  async removeCharacter(name: string) {
    await this.maps[this.players[name]]?.removeCharacter(name);
    this.server.emit(this.players[name] + ':player:leave', { name });
    delete this.players[name];
  }
  @SubscribeMessage('character:move')
  async move(name: string, directions: DirectionVector) {
    await this.maps[this.players[name]]?.moveCharacter(name, directions);
  }
}
