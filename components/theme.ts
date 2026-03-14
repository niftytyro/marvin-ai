import { createTheme } from "@shopify/restyle";

const colors = {
  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  lightGray: "#C4C4C4",
  gray: "#999",
  darkGray: "#4C4C4C",

  black: "#0B0B0B",
  white: "#F0F2F3",
};

const theme = createTheme({
  colors,
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export type Theme = typeof theme;
export default theme;
