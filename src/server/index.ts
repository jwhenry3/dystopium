import {isInWebWorker} from "./util";

if (isInWebWorker()) {
  console.info("Running Game Server in Web Worker for Offline and Hosting Capabilities");
}
