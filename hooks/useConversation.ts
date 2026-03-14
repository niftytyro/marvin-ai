import { ConversationStatus, ElevenLabsStatus } from "@/utils/types";
import { useConversation as _useConversation } from "@elevenlabs/react-native";
import { useCallback, useRef, useState } from "react";

const getNewStatus = (
  newStatus: ElevenLabsStatus,
  oldStatus: ConversationStatus
) => {
  switch (newStatus) {
    case "connected":
      return ConversationStatus.CONNECTED;
    case "connecting":
      return ConversationStatus.CONNECTING;
    default:
      if (
        oldStatus === ConversationStatus.CONNECTED ||
        oldStatus === ConversationStatus.CONNECTING
      ) {
        return ConversationStatus.DISRUPTED;
      }
      if (oldStatus === ConversationStatus.PAUSING) {
        return ConversationStatus.PAUSED;
      } else if (oldStatus === ConversationStatus.ENDING) {
        return ConversationStatus.ENDED;
      }
      return oldStatus;
  }
};

const useConversation = () => {
  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>(ConversationStatus.UNINITIALIZED);
  const transcriptRef = useRef<string[]>([]);

  const conversation = _useConversation({
    onConnect: () =>
      setConversationStatus(getNewStatus("connected", conversationStatus)),
    onDisconnect: () =>
      setConversationStatus(getNewStatus("disconnected", conversationStatus)),
    onMessage: ({ message, role }) => {
      transcriptRef.current.push(`${role}: ${message}`);
    },
    onStatusChange: (prop) =>
      setConversationStatus(getNewStatus(prop.status, conversationStatus)),
  });

  const startNewConversation = useCallback(async () => {
    if (
      conversation.status === "disconnected" ||
      conversation.status === "disconnecting"
    ) {
      await conversation.startSession({
        // agentId: "agent_9501kkn62xxge6jac724nnwgp7sv",
        agentId: "agent_6801kknhh1zkf4xs2h5e08hwqgrd",
      });
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    setConversationStatus(ConversationStatus.ENDING);
    await conversation.endSession();
  }, [conversation]);

  const pauseConversation = useCallback(async () => {
    setConversationStatus(ConversationStatus.PAUSING);
    await conversation.endSession();
  }, [conversation]);

  const resumeConversation = useCallback(async () => {
    await startNewConversation();
    conversation.sendContextualUpdate(
      `Previous conversation context: ${transcriptRef.current.join("\n")}`
    );
  }, [startNewConversation, conversation]);

  const mute = useCallback(() => {
    conversation.setMicMuted(true);
  }, [conversation]);

  const unmute = useCallback(() => {
    conversation.setMicMuted(false);
  }, [conversation]);

  return {
    mute,
    unmute,
    conversationStatus,
    startNewConversation,
    endConversation,
    pauseConversation,
    resumeConversation,
  };
};

export default useConversation;
