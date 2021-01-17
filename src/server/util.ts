import {isWebWorker} from "browser-or-node";

export function isInWebWorker() {
  return isWebWorker;
}
