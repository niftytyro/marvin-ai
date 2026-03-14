import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from "@shopify/restyle";
import theme, { Theme } from "./theme";

const Box = createBox<Theme>();
const Text = createText<Theme>();

export { Box, Text };
