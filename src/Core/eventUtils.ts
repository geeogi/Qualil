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
 * Set passive event listeners which will call the callback method with activeX and
 * activeY whenever these values change
 * @param callback
 */
export const addInteractivityHandlers = (
  callback: (args: { activeX?: number; activeY?: number }) => void,
  element: HTMLElement | SVGSVGElement
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
  element.addEventListener("mousemove", handleMouseMove, { passive: false });
  element.addEventListener("mouseleave", handleMouseLeave, { passive: false });
  element.addEventListener("touchmove", handleTouchMove, { passive: false });
  element.addEventListener("touchstart", handleTouchStart, { passive: false });
  element.addEventListener("touchend", handleTouchEnd, { passive: false });
  element.addEventListener("touchcancel", handleTouchCancel, { passive: false });

  // Return cleanup
  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
    element.removeEventListener("touchmove", handleTouchMove);
    element.removeEventListener("touchstart", handleTouchStart);
    element.removeEventListener("touchend", handleTouchEnd);
    element.removeEventListener("touchcancel", handleTouchCancel);
  };
};
