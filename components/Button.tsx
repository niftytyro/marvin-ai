import React, { useMemo } from "react";
import { Pressable } from "react-native";
import { Box, Text } from "./foundation";
import Animated, {
  CurvedTransition,
  Easing,
  EntryExitTransition,
  FadeInDown,
  FadeInUp,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";
import { Theme } from "./theme";
import { LinearEasing } from "react-native-reanimated/lib/typescript/css/easing";
import LottieView from "lottie-react-native";

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
  const bgColor: keyof Theme["colors"] = useMemo(() => {
    if (state === "disabled") {
      return "lightGray";
    }

    return variant === "primary"
      ? "black"
      : variant === "secondary"
      ? "lightGray"
      : "lightRed";
  }, [state, variant]);

  const textColor: keyof Theme["colors"] = useMemo(() => {
    if (state === "disabled") {
      return "darkGray";
    }

    return variant === "primary"
      ? "white"
      : variant === "secondary"
      ? "black"
      : "darkRed";
  }, [state, variant]);

  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeInDown.duration(100).delay(200).easing(Easing.linear)}
      exiting={FadeOutDown.duration(200)}
    >
      <Pressable
        onPress={onPress}
        disabled={state !== "enabled"}
        style={{ flex: 1 }}
      >
        <Box
          height={48}
          px="m"
          backgroundColor={bgColor}
          borderRadius={"large"}
          justifyContent="center"
          alignItems="center"
          flexDirection="row"
        >
          <Text variant="button" textAlign="center" color={textColor}>
            {label}
          </Text>
          {state === "loading" && (
            <LottieView
              autoPlay
              loop
              source={
                variant === "critical"
                  ? require("@/assets/lotties/loading-error.json")
                  : require("@/assets/lotties/loading.json")
              }
              style={{ height: 24, width: 24, marginLeft: 8 }}
            />
          )}
        </Box>
      </Pressable>
    </Animated.View>
  );
};

export default Button;
