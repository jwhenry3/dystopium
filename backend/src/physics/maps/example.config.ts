import { MapConfig } from '../loader';

export const exampleConfig: MapConfig = {
  name: 'Example World',
  objects: [],
  collisions: [
    {
      position: [200, 200],
      points: [
        [-32, 8],
        [-32, 0],
        [32, 0],
        [32, 32],
        [16, 16],
      ],
    },
  ],
};
