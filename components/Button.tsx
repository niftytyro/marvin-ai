import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "./foundation";

export interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "critical";
  state?: "enabled" | "disabled" | "loading";
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  state = "enabled",
  variant = "primary",
}) => {
  return (
    <Pressable onPress={onPress} style={{ flex: 1 }}>
      <Box
        height={48}
        px="m"
        backgroundColor={
          variant === "primary"
            ? "black"
            : variant === "secondary"
            ? "lightGray"
            : "lightRed"
        }
        borderRadius={8}
        justifyContent="center"
        alignItems="center"
      >
        <Text
          variant="button"
          textAlign="center"
          color={
            variant === "primary"
              ? "white"
              : variant === "secondary"
              ? "black"
              : "darkRed"
          }
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;
