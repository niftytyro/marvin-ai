import React from "react";
import { Box, Text } from "./foundation";
import ButtonGroup, { ButtonGroupProps } from "./ButtonGroup";

export interface FooterProps extends ButtonGroupProps {
  message?: string;
}

const Footer: React.FC<FooterProps> = ({
  message,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <Box>
      {message && (
        <Text textAlign="center" variant="bodySmall" color="darkGray" mb="m">
          {message}
        </Text>
      )}

      <ButtonGroup primaryCta={primaryCta} secondaryCta={secondaryCta} />
    </Box>
  );
};

export default Footer;
