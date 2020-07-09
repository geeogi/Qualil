import {
  getCoordinatesOfMouseEvent,
  getCoordinatesOfTouchEvent,
} from "./domUtils";

/**
 * Return event listeners which will call the callback method with activeX and
 * activeY whenever these values change
 * @param callback
 */
export const addInteractivityHandlers = (
  callback: (args: { activeX?: number; activeY?: number }) => void,
  element: HTMLElement
) => {
  // Methods
  const handleMouseMove = (e: any) => {
    const { x, y } = getCoordinatesOfMouseEvent(e);
    callback({
      activeX: x,
      activeY: y,
    });
  };

  const handleTouchStart = (e: any) => {
    const { x, y } = getCoordinatesOfTouchEvent(e);
    callback({
      activeX: x,
      activeY: y,
    });
  };

  const handleTouchMove = handleTouchStart;

  const handleMouseLeave = () => {
    callback({});
    console.log("left");
  };

  const handleTouchEnd = handleMouseLeave;

  // Attach event listeners
  element.addEventListener("mousemove", handleMouseMove, { passive: true });
  element.addEventListener("mouseleave", handleMouseLeave, { passive: true });
  element.addEventListener("touchmove", handleTouchMove, { passive: true });
  element.addEventListener("touchstart", handleTouchStart, { passive: true });
  element.addEventListener("touchend", handleTouchEnd, { passive: true });

  // Return method to remove event listeners
  return () => {
    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchmove", handleTouchMove);
    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);
  };
};
