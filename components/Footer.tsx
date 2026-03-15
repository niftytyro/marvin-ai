import React from "react";
import { Box, Text } from "./foundation";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";
import { useTheme } from "@shopify/restyle";
import { Theme } from "./theme";

export interface FooterProps extends ButtonGroupProps {
  message?: string;
}

const Footer: React.FC<FooterProps> = ({
  message,
  primaryCta,
  secondaryCta,
}) => {
  const { textVariants } = useTheme<Theme>();

  return (
    <Box
      height={textVariants.bodySmall.lineHeight + 16 + 48}
      width="100%"
      alignItems="center"
      justifyContent="flex-end"
    >
      {message && (
        <Text textAlign="center" variant="bodySmall" color="darkGray" mb="m">
          {message ?? ""}
        </Text>
      )}

      <ButtonGroup primaryCta={primaryCta} secondaryCta={secondaryCta} />
    </Box>
  );
};

export default Footer;
