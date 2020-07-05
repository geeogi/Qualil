export const COLORS = {
  POSITIVE: {
    COLOR: "rgb(0, 255, 0)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(0, 255, 0, ${opacity})`;
    },
  },
  NEGATIVE: {
    COLOR: "rgb(255, 0, 0)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(255, 0, 0, ${opacity})`;
    },
  },
};

export const POSITIVE_COLOR = "rgb(0, 255, 0)";
export const POSITIVE_COLOR_ALPHA = (opacity: number) => {
  return `rgba(0, 255, 0, ${opacity})`;
};
export const NEGATIVE_COLOR = "rgb(255, 0, 0)";
export const NEGATIVE_COLOR_ALPHA = (opacity: number) => {
  return `rgba(255, 0, 0, ${opacity})`;
};

export const BACKGROUND_COLOR = "black";
export const CONTRAST_COLOUR = "white";
export const AXIS_COLOUR = "#555";
