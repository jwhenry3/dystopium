import { MapConfig } from "../loader";

export const exampleConfig: MapConfig = {
  name: "Example World",
  objects: [],
  collisions: [
    {
      position: [200, 200],
      points: [
        [-1, 1],
        [-1, 0],
        [1, 0],
        [1, 1],
        [0.5, 0.5],
      ],
    },
  ],
};
