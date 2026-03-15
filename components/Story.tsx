import React, { useEffect } from "react";
import { Box, SafeTopSpace, Text } from "./foundation";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface StoryProps {
  children?: React.ReactNode;
}

const Story: React.FC<StoryProps> = ({ children }) => {
  const tweener = useSharedValue(0);

  useEffect(() => {
    const easing = Easing.bezierFn(0.5, 0.0, 0.56, 0.94);

    tweener.value = withSequence(
      withDelay(
        500,
        withTiming(1, {
          duration: 800,
          easing,
        })
      ),
      withDelay(
        1200,
        withTiming(2, {
          duration: 800,
          easing,
        })
      ),
      withDelay(
        200,
        withTiming(3, {
          duration: 800,
          easing,
        })
      ),
      withDelay(
        2500,
        withTiming(4, {
          duration: 800,
          easing,
        })
      ),
      withDelay(
        200,
        withTiming(5, {
          duration: 800,
          easing,
        })
      )
    );
  }, [tweener]);

  const splashStyle = useAnimatedStyle(() => ({
    paddingHorizontal: 20,
    opacity: interpolate(tweener.value, [0, 1, 2, 3, 4, 5], [0, 1, 0, 0, 0]),
    transform: [
      {
        translateY: interpolate(
          tweener.value,
          [0, 0.5, 1, 2, 3],
          [10, 4, 0, -10, 0]
        ),
      },
    ],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  }));

  const introStyle = useAnimatedStyle(() => ({
    paddingHorizontal: 20,
    opacity: interpolate(tweener.value, [0, 1, 2, 3, 4, 5], [0, 0, 0, 1, 0, 0]),
    transform: [
      {
        translateY: interpolate(
          tweener.value,
          [0, 1, 2, 3, 4],
          [0, 0, 10, 0, -15, 0]
        ),
      },
    ],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(tweener.value, [0, 1, 2, 3, 4, 5], [0, 0, 0, 0, 0, 1]),
    transform: [
      {
        translateY: interpolate(
          tweener.value,
          [0, 1, 2, 3, 4, 5],
          [0, 0, 0, 0, 10, 0]
        ),
      },
    ],
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }));

  return (
    <Box position="relative" flex={1} bg="white">
      <Animated.View style={splashStyle}>
        <Text variant="hero" color="black100" fontFamily="Libre Baskerville">
          {"Don't\nPanic"}
        </Text>
      </Animated.View>

      <Animated.View style={introStyle}>
        <Text
          variant="body"
          color="black100"
          fontFamily="Libre Baskerville"
          textAlign="center"
        >
          {
            "This is Marvin - the Paranoid Android.\nWhatever you do... don't talk to him about life."
          }
        </Text>
      </Animated.View>

      <Animated.View style={contentStyle}>{children}</Animated.View>
    </Box>
  );
};

export default Story;
