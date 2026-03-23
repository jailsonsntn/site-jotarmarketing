type IdleDeadlineLike = {
  didTimeout: boolean;
  timeRemaining: () => number;
};

type IdleCallback = (deadline: IdleDeadlineLike) => void;
type IdleHandle = number;

declare global {
  interface Window {
    requestIdleCallback?: (
      callback: IdleCallback,
      options?: { timeout?: number }
    ) => IdleHandle;
    cancelIdleCallback?: (handle: IdleHandle) => void;
  }
}

export const requestIdle = (callback: IdleCallback, timeout = 700): IdleHandle => {
  if (typeof window.requestIdleCallback === "function") {
    return window.requestIdleCallback(callback, { timeout });
  }

  return window.setTimeout(() => {
    callback({
      didTimeout: false,
      timeRemaining: () => 0,
    });
  }, 1);
};

export const cancelIdle = (handle: IdleHandle) => {
  if (typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(handle);
    return;
  }

  window.clearTimeout(handle);
};