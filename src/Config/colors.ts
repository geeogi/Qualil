export const COLORS = {
  POSITIVE: {
    COLOR: "rgb(0, 158, 115)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(0, 158, 115, ${opacity})`;
    },
  },
  NEGATIVE: {
    COLOR: "rgb(217, 64, 64)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(217, 64, 64, ${opacity})`;
    },
  },
  NEUTRAL: {
    COLOR: "rgb(102, 153, 204)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(102, 153, 204, ${opacity})`;
    },
  },
};

/**
 * Fetch CSS variables from the Document
 */
const style = getComputedStyle(document.documentElement);
export const BACKGROUND_COLOR = style.getPropertyValue("--background-color");
export const CONTRAST_COLOUR = style.getPropertyValue("--contrast-color");
export const ATTRIBUTE_COLOUR = style.getPropertyValue("--attribute-color");
export const AXIS_COLOUR = style.getPropertyValue("--axis-color");
