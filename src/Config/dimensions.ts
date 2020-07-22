export const CONTAINER_PADDING = 16;
export const GRAPH_MARGIN = window.innerWidth < 700 ? 0 : 16;

const containerWidth = window.innerWidth - CONTAINER_PADDING * 2;
const boxWidth = containerWidth > 1000 ? containerWidth / 3 : containerWidth;

export const graphWidth = Math.floor(boxWidth - 2 * GRAPH_MARGIN);
export const graphHeight = Math.floor((9 / 16) * graphWidth);
