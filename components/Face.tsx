import { ConversationStatus } from "@/utils/types";
import React from "react";
import { Box } from "./foundation";
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./theme";
import Orb from "@/assets/lotties/orb.json";
import { StyleSheet } from "react-native";

interface FaceProps {
  status: ConversationStatus;
}

const getAnimationConfig = (status: ConversationStatus) => {
  switch (status) {
    case ConversationStatus.UNINITIALIZED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    case ConversationStatus.CONNECTING:
      return { loop: true, autoPlay: true, speed: 0.5 };
    case ConversationStatus.CONNECTED:
      return { loop: true, autoPlay: true, speed: 1 };
    case ConversationStatus.PAUSING:
      return { loop: true, autoPlay: true, speed: 0.5 };
    case ConversationStatus.PAUSED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    case ConversationStatus.ENDING:
      return { loop: true, autoPlay: true, speed: 0.5 };
    case ConversationStatus.ENDED:
      return { loop: false, autoPlay: false, speed: 0 };
    case ConversationStatus.DISRUPTED:
      return { loop: true, autoPlay: true, speed: 0.2 };
    default:
      return { loop: false, autoPlay: false, speed: 1 };
  }
};

const Face: React.FC<FaceProps> = ({ status }) => {
  const { borderRadii } = useTheme<Theme>();

  const overlayStyle = useAnimatedStyle(() => ({
    backgroundColor:
      status === ConversationStatus.CONNECTED
        ? undefined
        : "rgba(0, 0, 0, 0.1)",
    height: 173,
    width: 173,
    position: "absolute",
    left: 63,
    top: 63,
    pointerEvents: "none",
    borderRadius: borderRadii.round,
  }));

  const containerStyle = useAnimatedStyle(() => ({
    width: 300,
    height: 300,
    position: "relative",
  }));

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
