import React from "react";
import { Box, Text } from "./foundation";

interface BannerProps {
  label: string;
}

const Banner: React.FC<BannerProps> = ({ label }) => {
  return (
    <Box bg="white" borderWidth={1} borderColor="lightGray">
      <Text variant="body">{label}</Text>
    </Box>
  );
};

export default Banner;
