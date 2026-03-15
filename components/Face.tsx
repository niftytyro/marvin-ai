import { ConversationStatus } from "@/utils/types";
import React, { useEffect } from "react";
import { Box } from "./foundation";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./theme";
import Orb from "@/assets/lotties/orb.json";

interface FaceProps {
  status: ConversationStatus;
  mode?: "thinking" | "listening" | "speaking";
}

const getAnimationConfig = (status: ConversationStatus) => {
  switch (status) {
    case ConversationStatus.UNINITIALIZED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    case ConversationStatus.CONNECTING:
      return { loop: true, autoPlay: true, speed: 0.3 };
    case ConversationStatus.CONNECTED:
      return { loop: true, autoPlay: true, speed: 1 };
    case ConversationStatus.PAUSING:
      return { loop: true, autoPlay: true, speed: 0.3 };
    case ConversationStatus.PAUSED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    case ConversationStatus.ENDING:
      return { loop: true, autoPlay: true, speed: 0.3 };
    case ConversationStatus.ENDED:
      return { loop: false, autoPlay: false, speed: 0 };
    case ConversationStatus.DISRUPTED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    default:
      return { loop: false, autoPlay: false, speed: 1 };
  }
};

const Face: React.FC<FaceProps> = ({ status, mode = "thinking" }) => {
  const { borderRadii } = useTheme<Theme>();

  const tweener = useSharedValue(1);

  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor:
      status === ConversationStatus.CONNECTED
        ? undefined
        : "rgba(0, 0, 0, 0.1)",
    height: 173 * tweener.value,
    width: 173 * tweener.value,
    position: "absolute",
    left: 63 * tweener.value,
    top: 63 * tweener.value,
    pointerEvents: "none",
    borderRadius: borderRadii.round,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: 300 * tweener.value,
    height: 300 * tweener.value,
    position: "relative",
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Starting tweener animation", 1 + (Math.random() % 0.2));
      const factor = mode === "thinking" ? 0.2 : 0.4;
      const duration = mode === "speaking" ? 800 : 1000;

      tweener.value = withTiming(1 + (Math.random() % factor), {
        duration,
        easing: Easing.linear,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tweener, mode]);

  return (
    <Animated.View style={containerStyle}>
      <LottieView
        source={Orb}
        {...getAnimationConfig(status)}
        style={{
          flex: 1,
        }}
      />

      {status !== ConversationStatus.CONNECTED ? (
        <Animated.View
          key="overlay"
          entering={FadeIn.duration(100).delay(200)}
          exiting={FadeOut.duration(200)}
          style={overlayStyle}
        />
      ) : null}
    </Animated.View>
  );
};

export default Face;
