import { World, Body } from "p2";

export declare type Point = [number, number];
export interface ObjectConfig {
  id: string;
  position: Point;
}
export interface CollisionConfig {
  position: Point;
  points: Point[];
}
export interface MapConfig {
  objects: ObjectConfig[];
  collisions: CollisionConfig[];
}

export function loadCollision(world: World, collision: CollisionConfig) {
  const body = new Body({
    mass: 100,
    fixedX: true,
    fixedY: true,
    position: collision.position,
  });
  body.fromPolygon(collision.points);
  world.addBody(body);
}

export function loadMapConfig(world: World, config: MapConfig) {
  for (const collision of config.collisions) {
    loadCollision(world, collision);
  }
}
