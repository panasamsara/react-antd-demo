/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback, useMemo } from "react";

export function useReactiveRef(initialValue = undefined) {
  const update = useForceUpdate();

  const ref = useMemo(() => {
    let val = initialValue;
    return {
      get current() {
        return val;
      },
      set current(value) {
        if (value) {
          val = value;
          update();
        }
      }
    };
  }, []);

  return ref;
}

export function useForceUpdate() {
  const [, setState] = useState(0);
  return useCallback(() => setState((s) => s + 1), []);
}
