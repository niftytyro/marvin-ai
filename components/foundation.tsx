import { createBox, createText } from "@shopify/restyle";
import { Theme } from "./theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export const SafeTopSpace = () => {
  const { top } = useSafeAreaInsets();

  return <Box height={top} />;
};

export const SafeBottomSpace = () => {
  const { bottom } = useSafeAreaInsets();

  return <Box height={bottom} />;
};
