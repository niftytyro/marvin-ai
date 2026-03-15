import React, { ComponentProps } from "react";
import { Box, Text } from "./foundation";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./theme";
import AntDesign from "@expo/vector-icons/AntDesign";

export interface FooterProps extends ButtonGroupProps {
  message?: MessageProps;
}

interface MessageProps {
  variant?: "critical" | "regular";
  text: string;
}

type IconProps = ComponentProps<typeof AntDesign>;

const Message: React.FC<MessageProps> = (message) => {
  const { colors } = useTheme<Theme>();

  const icon: IconProps | null =
    message.variant === "critical"
      ? {
          name: "info-circle",
          size: 16,
          color: colors.darkRed,
        }
      : null;

  return (
    <Box
      flexDirection="row"
      alignItems="flex-start"
      gap="s"
      width={"100%"}
      mb="m"
    >
      {message.variant === "critical" && (
        <Box pt="xs">
          <AntDesign {...icon} />
        </Box>
      )}

      <Box flex={1}>
        <Text
          variant="bodySmall"
          color={message.variant === "critical" ? "darkRed" : "darkGray"}
          width={"100%"}
          textAlign={!!icon ? "left" : "center"}
        >
          {message.text}
        </Text>
      </Box>
    </Box>
  );
};

const Footer: React.FC<FooterProps> = ({
  message,
  primaryCta,
  secondaryCta,
}) => {
  const { textVariants } = useTheme<Theme>();

  return (
    <Box
      height={textVariants.bodySmall.lineHeight * 2 + 16 + 48}
      width="100%"
      alignItems="center"
      justifyContent="flex-end"
    >
      {message && <Message {...message} />}

      <ButtonGroup primaryCta={primaryCta} secondaryCta={secondaryCta} />
    </Box>
  );
};

export default Footer;
