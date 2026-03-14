import { Box, Text } from "@/components/foundation";
import { Theme } from "@/components/theme";
import { useTheme } from "@shopify/restyle";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Splash = () => {
  const { colors } = useTheme<Theme>();
  const opacityTweener = useSharedValue(0);
  const positionTweener = useSharedValue(0);

  useEffect(() => {
    opacityTweener.value = withDelay(
      500,
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezierFn(0.82, 0.11, 0.53, 0.96),
      })
    );

    positionTweener.value = withDelay(
      500,
      withTiming(1, {
        duration: 1000,
      })
    );

    const timer = setTimeout(() => {
      router.replace("/conversation");
    }, 2000);

    return () => clearTimeout(timer);
  }, [positionTweener, opacityTweener]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: colors.white,
    opacity: opacityTweener.value,
    transform: [{ translateY: (1 - positionTweener.value) * 10 }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Box>
        <Text variant="hero" color="black100" fontFamily="Libre Baskerville">
          {"Don't\nPanic"}
        </Text>
      </Box>
    </Animated.View>
  );
};

export default Splash;
