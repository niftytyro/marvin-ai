import React from "react";
import { Pressable } from "react-native";
import { Box, Text } from "./foundation";

interface ButtonProps {
  label: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Box
        height={48}
        px="m"
        backgroundColor="black"
        borderRadius={8}
        justifyContent="center"
        alignItems="center"
      >
        <Text variant="button" color="white">
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;
