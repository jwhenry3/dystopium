import { useCallback, useRef } from "react";


export default function useUpdateThrottle(current: number, interval: number) {
  const tick = useRef<number>(current);
  return useCallback((time: number, callback: () => void) => {
    const nextTick = Math.floor(time / interval);
    if (tick.current < nextTick) {
      tick.current = nextTick;
      callback();
    }
  }, [interval]);
}
