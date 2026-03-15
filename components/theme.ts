import { createTheme } from "@shopify/restyle";

const colors = {
  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  lightGray: "#C4C4C4",
  gray: "#999",
  darkGray: "#4C4C4C",

  black100: "#2C2C2C",
  black: "#0B0B0B",
  white100: "#F0F0F0",
  white: "#F8F8F8",

  lightRed: "#FFE0E0",
  darkRed: "#990000",
};

const theme = createTheme({
  colors,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    hero: {
      fontWeight: "bold",
      fontSize: 36,
      fontFamily: "Libre Baskerville",
      lineHeight: 48,
    },
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
      fontWeight: 600,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
  borderRadii: {
    large: 8,
    round: 999,
  },
});

export type Theme = typeof theme;
export default theme;
