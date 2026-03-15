import { ConversationStatus, ElevenLabsStatus } from "@/utils/types";
import {
  useConversation as _useConversation,
  Role,
} from "@elevenlabs/react-native";
import { useAudioPlayer } from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";

const audioSource = require("@/assets/sounds/toggle.wav");

// TODO find a nicer way to do this state management
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
  const player = useAudioPlayer(audioSource);

  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>(ConversationStatus.UNINITIALIZED);
  const transcriptRef = useRef<string[]>([]);
  const [emptyReplyCounter, setEmptyReplyCounter] = useState(0);

  const onMessage = useCallback(
    ({ message, role }: { message: string; role: Role }) => {
      transcriptRef.current.push(`${role}: ${message}`);
      if (role === "user") {
        if (message === "...") {
          setEmptyReplyCounter((c) => c + 1);
        } else if (emptyReplyCounter > 0) {
          setEmptyReplyCounter(0);
        }
      }
    },
    [emptyReplyCounter]
  );

  const conversation = _useConversation({
    onConnect: () =>
      setConversationStatus(getNewStatus("connected", conversationStatus)),
    onDisconnect: () =>
      setConversationStatus(getNewStatus("disconnected", conversationStatus)),
    onMessage,
    onStatusChange: (prop) =>
      setConversationStatus(getNewStatus(prop.status, conversationStatus)),
    // TODO check what kinds of errors these are
    onError: (error) => setConversationStatus(ConversationStatus.DISRUPTED),
  });

  const startNewConversation = useCallback(async () => {
    if (
      conversation.status === "disconnected" ||
      conversation.status === "disconnecting"
    ) {
      try {
        await conversation.startSession({
          // agentId: "agent_9501kkn62xxge6jac724nnwgp7sv",
          agentId: "agent_6801kknhh1zkf4xs2h5e08hwqgrd",
        });
      } catch {
        setConversationStatus(ConversationStatus.DISRUPTED);
      }
    }
  }, [conversation]);

  const endConversation = useCallback(async () => {
    setConversationStatus(ConversationStatus.ENDING);
    // TODO solve for sync updates
    setTimeout(async () => {
      await conversation.endSession();
    });
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

  useEffect(() => {
    if (emptyReplyCounter >= 2) {
      endConversation();
    }
  }, [endConversation, emptyReplyCounter]);

  useEffect(() => {
    if (
      conversationStatus === ConversationStatus.CONNECTING ||
      conversationStatus === ConversationStatus.DISRUPTED ||
      conversationStatus === ConversationStatus.ENDED ||
      conversationStatus === ConversationStatus.PAUSED
    ) {
      player.play();
    }
  }, [conversationStatus, player]);

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
