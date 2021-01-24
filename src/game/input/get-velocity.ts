import { GameRules } from "../rules";
import { KeyMap }    from "../scenes/input/keys";

const singleSpeed = GameRules.speed;
const diagonalSpeed = singleSpeed / 1.41;

export function getVelocity(keys: KeyMap) {
  const directions = { x: 0, y: 0 };
  if (keys.w?.isDown) {
    directions.y = -1;
  }
  if (keys.s?.isDown) {
    directions.y = +1;
  }
  if (keys.a?.isDown) {
    directions.x = -1;
  }
  if (keys.d?.isDown) {
    directions.x = +1;
  }
  let speed = singleSpeed;
  if (directions.x !== 0 && directions.y !== 0) {
    speed = diagonalSpeed;
  }
  return {
    x: directions.x * speed,
    y: directions.y * speed
  };
}
