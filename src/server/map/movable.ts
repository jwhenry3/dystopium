import { Body, Circle } from "p2";
export class Movable extends Body {
  damping = 0;
  fixedVelocity: [number, number] = [0, 0];
  constructor(x: number, y: number) {
    super({ mass: 5, position: [x, y] });
    this.addShape(new Circle({ radius: 16 }));
  }
}
