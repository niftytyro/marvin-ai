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
      if (oldStatus === ConversationStatus.CONNECTED) {
        return ConversationStatus.DISRUPTED;
      }
      return ConversationStatus.ENDED;
  }
};

const useConversation = () => {
  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>(ConversationStatus.ENDED);
  const transcriptRef = useRef<string[]>([]);

  const conversation = _useConversation({
    onConnect: () => setConversationStatus(ConversationStatus.CONNECTED),
    // onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: ({ message, role }) => {
      transcriptRef.current.push(`${role}: ${message}`);
    },
    // onError: (error) => console.error("Conversation error:", error),
    // onModeChange: (mode) => console.log("Conversation mode changed:", mode),
    onStatusChange: (prop) =>
      setConversationStatus(getNewStatus(prop.status, conversationStatus)),
    // onCanSendFeedbackChange: (prop) =>
    //   console.log("Can send feedback changed:", prop.canSendFeedback),
    // onUnhandledClientToolCall: (params) =>
    //   console.log("Unhandled client tool call:", params),
    // onAudioAlignment: (alignment) =>
    //   console.log("Alignment data received:", alignment),
    // onAgentChatResponsePart: (part) => console.log("Chat response part:", part),
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
    await conversation.endSession();
    setConversationStatus(ConversationStatus.ENDED);
  }, [conversation]);

  const pauseConversation = useCallback(async () => {
    await endConversation();
  }, [endConversation]);

  const resumeConversation = useCallback(async () => {
    await startNewConversation();
    conversation.sendContextualUpdate(
      `Previous conversation context: ${transcriptRef.current.join("\n")}`
    );
  }, [startNewConversation, conversation]);

  return {
    conversationStatus,
    startNewConversation,
    endConversation,
    pauseConversation,
    resumeConversation,
  };
};

export default useConversation;
