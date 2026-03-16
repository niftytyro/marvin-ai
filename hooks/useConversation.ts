import { ConversationStatus, ElevenLabsStatus } from "@/utils/types";
import {
  useConversation as _useConversation,
  Mode,
  Role,
} from "@elevenlabs/react-native";
import { useAudioPlayer } from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";

const audioSource = require("@/assets/sounds/toggle.wav");

// TODO find a nicer way to do this state management - probably xstate
const getNewStatus = (
  newStatus: ElevenLabsStatus,
  oldStatus: ConversationStatus
) => {
  switch (newStatus) {
    case "connected":
      return ConversationStatus.CONNECTED;
    case "connecting":
      if (oldStatus === ConversationStatus.PAUSED) {
        return ConversationStatus.RECONNECTING;
      }
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
  const [agentMode, setAgentMode] = useState<Mode | undefined>();
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
    onModeChange: ({ mode }) => setAgentMode(mode),
  });

  const startNewConversation = useCallback(async () => {
    if (
      conversation.status === "disconnected" ||
      conversation.status === "disconnecting"
    ) {
      try {
        console.log("New conversation starting...");
        player.play();
        await conversation.startSession({
          agentId: "agent_3701kkrs7gmqf19r95z10x7efksx",
        });
      } catch {
        setConversationStatus(ConversationStatus.DISRUPTED);
      }
    }
  }, [conversation, player]);

  const endConversation = useCallback(async () => {
    setConversationStatus(ConversationStatus.ENDING);
    // TODO solve for sync updates
    setTimeout(async () => {
      await conversation.endSession();
      player.play();
    });
  }, [conversation, player]);

  const pauseConversation = useCallback(
    async (playAudio: boolean = true) => {
      setConversationStatus(ConversationStatus.PAUSING);
      // TODO solve for sync updates
      setTimeout(async () => {
        await conversation.endSession();
        if (playAudio) {
          player.play();
        }
      });
    },
    [conversation, player]
  );

  const resumeConversation = useCallback(async () => {
    player.play();
    await startNewConversation();
    conversation.sendContextualUpdate(
      `Previous conversation context: ${transcriptRef.current.join("\n")}`
    );
  }, [startNewConversation, conversation, player]);

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

  return {
    mute,
    unmute,
    conversationStatus,
    startNewConversation,
    endConversation,
    pauseConversation,
    resumeConversation,
    agentMode,
  };
};

export default useConversation;
