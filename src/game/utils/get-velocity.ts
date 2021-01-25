import { GameRules } from "../rules";

const singleSpeed = GameRules.speed;
const diagonalSpeed = singleSpeed / 1.41;

export function getVelocity(x: number, y: number) {
  let speed = singleSpeed;
  if (x !== 0 && y !== 0) {
    speed = diagonalSpeed;
  }
  return {
    x: x * speed,
    y: y * speed
  };
}
