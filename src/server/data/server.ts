import { wrap } from "comlink";
import { ServerWorker } from "./server.worker";

const worker = new Worker("./server.worker", {
  name: "server-worker",
  type: "module",
});
const Server: ServerWorker = wrap<ServerWorker>(worker);
export default Server;
