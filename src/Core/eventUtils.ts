import {
  getCoordinatesOfMouseEvent,
  getCoordinatesOfTouchEvent,
} from "./domUtils";

/**
 * Extract activeX and activeX from event
 */
export const handleMouseMove = (e: any) => {
  const { x, y } = getCoordinatesOfMouseEvent(e);
  return { activeX: x, activeY: y };
};

export const handleTouchStart = (e: any) => {
  const { x, y } = getCoordinatesOfTouchEvent(e);
  return { activeX: x, activeY: y };
};

export const handleTouchMove = handleTouchStart;
