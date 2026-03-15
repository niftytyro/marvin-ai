import React, { useEffect } from "react";
import { Box } from "./foundation";
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useEvent,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Button, { ButtonProps } from "./Button";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./theme";

export interface ButtonGroupProps {
  primaryCta?: ButtonProps;
  secondaryCta?: ButtonProps;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  primaryCta,
  secondaryCta,
}) => {
  const { spacing } = useTheme<Theme>();

  const width = useSharedValue(primaryCta && secondaryCta ? 0.5 : 1);
  const containerWidth = useSharedValue(0);

  useEffect(() => {
    width.value = primaryCta && secondaryCta ? 0.5 : 1;
  }, [primaryCta, secondaryCta, width]);

  const buttonStyle = useAnimatedStyle(() => ({
    width: (containerWidth.value - spacing.s) * width.value,
    height: 50,
  }));

  return (
    <Box
      onLayout={(e) => {
        containerWidth.value = e.nativeEvent.layout.width;
      }}
      gap="s"
      flexDirection="row"
    >
      {primaryCta && (
        <Animated.View
          key={`primary-cta-${primaryCta.label}`}
          style={buttonStyle}
          layout={LinearTransition}
        >
          <Button {...primaryCta} />
        </Animated.View>
      )}

      {secondaryCta && (
        <Animated.View
          key={`secondary-cta-${secondaryCta.label}`}
          style={buttonStyle}
          layout={LinearTransition}
        >
          <Button {...secondaryCta} />
        </Animated.View>
      )}
    </Box>
  );
};

export default ButtonGroup;
