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
};

export const BACKGROUND_COLOR = "white";
export const CONTRAST_COLOUR = "black";
export const AXIS_COLOUR = "#e6e6e6";
