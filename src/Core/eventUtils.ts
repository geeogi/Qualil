import {
  getCoordinatesOfMouseEvent,
  getCoordinatesOfTouchEvent,
} from "./domUtils";

/**
 * This global state tracks whether or not a touch event was fired recently
 * If so, we'll want to disable mousemove events to prevent double firing
 */
let wasRecentlyTouched = false;
let resetTouchedTimerId: NodeJS.Timeout;

const setRecentlyTouched = () => {
  wasRecentlyTouched = true;
  removeTouchedResetTimer();
};

const removeTouchedResetTimer = () => {
  if (resetTouchedTimerId) {
    clearTimeout(resetTouchedTimerId);
  }
};

const setTouchedResetTimer = () => {
  removeTouchedResetTimer();
  resetTouchedTimerId = setTimeout(() => {
    wasRecentlyTouched = false;
  }, 2000);
};

/**
 * Set event listeners which will call the callback method with activeX and
 * activeY whenever these values change
 * @param callback
 */
export const addInteractivityHandlers = (
  callback: (args: { activeX?: number; activeY?: number }) => void,
  element: HTMLElement
) => {
  const handleMouseMove = (e: any) => {
    if (!wasRecentlyTouched) {
      const { x, y } = getCoordinatesOfMouseEvent(e);
      callback({ activeX: x, activeY: y });
    }
  };

  const handleTouchStart = (e: any) => {
    setRecentlyTouched();
    const { x, y } = getCoordinatesOfTouchEvent(e);
    callback({ activeX: x, activeY: y });
  };

  const handleTouchMove = handleTouchStart;

  const handleMouseLeave = () => {
    callback({});
  };

  const handleTouchEnd = () => {
    callback({});
    setTouchedResetTimer();
  };

  const handleTouchCancel = handleTouchEnd;

  // Attach event listeners
  element.addEventListener("mousemove", handleMouseMove, { passive: true });
  element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
  element.addEventListener("touchmove", handleTouchMove, { passive: true });
  element.addEventListener("touchstart", handleTouchStart, { passive: true });
  element.addEventListener("touchend", handleTouchEnd, { passive: true });
  element.addEventListener("touchcancel", handleTouchCancel, { passive: true });
};
