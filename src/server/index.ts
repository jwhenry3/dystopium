import {isInWebWorker} from "./util";

if (isInWebWorker()) {
  console.info("Running Game Server in Web Worker for Offline and Hosting Capabilities");
}

export interface ServiceRegistry {
  [key: string]: any
}

const services: ServiceRegistry = {};

export function registerService<T>(key: string, service: T) {
  services[key] = service;
}

export function getService<T>(key: string): T {
  return services[key] as T;
}
