import { isWebWorker } from "browser-or-node";
import { isEqual, isObject, transform } from "lodash";

export function isInWebWorker() {
  return isWebWorker;
}

export function difference(object: any, base: any): Partial<any> {
  function changes(object: any, base: any) {
    return transform(object, function (result, value, key) {
      if (!isEqual(value, base[key])) {
        (result as any)[key] =
          isObject(value) && isObject(base[key])
            ? changes(value, base[key])
            : value;
      }
    });
  }
  return changes(object, base) as Partial<any>;
}
