import { Body, Circle } from "p2";
import { subscribe, unsubscribe } from "pubsub-js";
export class Movable extends Body {
  damping = 0;
  fixedVelocity: [number, number] = [0, 0];

  token: string = "";
  constructor(x: number, y: number) {
    super({ mass: 5, position: [x, y] });
    this.addShape(new Circle({ radius: 16 }));
    this.listen();
  }

  listen() {
    this.token = subscribe(
      "map:update",
      (event: string, data: { time: number; deltaTime: number }) =>
        this.update(data.time, data.deltaTime)
    );
  }

  update(time: number, deltaTime: number) {
    this.velocity = [...this.fixedVelocity] as [number, number];
  }

  stop() {
    if (this.token !== "") {
      unsubscribe(this.token);
    }
  }
}
