export const COLORS = {
  POSITIVE: {
    COLOR: "rgb(0, 158, 115)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(0, 158, 115, ${opacity})`;
    },
  },
  NEGATIVE: {
    COLOR: "rgb(236, 77, 61)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(236, 77, 61, ${opacity})`;
    },
  },
  NEUTRAL: {
    COLOR: "rgb(117, 198, 245)",
    COLOR_ALPHA: (opacity: number) => {
      return `rgba(117, 198, 245, ${opacity})`;
    },
  },
};
