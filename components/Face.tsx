import { ConversationStatus } from "@/utils/types";
import React from "react";
import { Box } from "./foundation";

interface FaceProps {
  status: ConversationStatus;
}

const Face: React.FC<FaceProps> = ({ status }) => {
  return (
    <Box
      borderRadius={100}
      width={200}
      height={200}
      backgroundColor={
        status === ConversationStatus.CONNECTED ? "greenDark" : "lightGray"
      }
    />
  );
};

export default Face;
