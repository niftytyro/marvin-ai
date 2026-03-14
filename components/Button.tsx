import React from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
  label: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          height: 48,
          paddingHorizontal: 16,
          backgroundColor: "#007AFF",
          borderRadius: 8,
          marginTop: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{label}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
