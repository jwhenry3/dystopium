import { KeyMap } from "../interfaces/keys";

export declare type DirectionVector = [number, number];

export function getDirection(keys: KeyMap): DirectionVector {
  const directions = { x: 0, y: 0 };
  if (keys.w?.isDown) {
    directions.y -= 1;
  }
  if (keys.s?.isDown) {
    directions.y += 1;
  }
  if (keys.a?.isDown) {
    directions.x -= 1;
  }
  if (keys.d?.isDown) {
    directions.x += 1;
  }
  return [directions.x, directions.y];
}
