import { Body } from "p2";
import { BaseWorld } from "../base.world";
import { loadMapConfig } from "../loader";
import { exampleConfig } from "./example.config";

export class ExampleWorld extends BaseWorld {
  characters: { [name: string]: Body } = {};
  constructor() {
    super("Example World");
    loadMapConfig(this, exampleConfig);
  }

}
