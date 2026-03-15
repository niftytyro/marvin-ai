import useMic from "@/hooks/useMic";
import { AppState, Linking, Pressable } from "react-native";
import { ButtonProps } from "./Button";
import { useEffect, useMemo, useRef } from "react";
import useConversation from "@/hooks/useConversation";
import { ConversationStatus } from "@/utils/types";
import { useNetworkState } from "expo-network";
import { Box, SafeBottomSpace, SafeTopSpace } from "./foundation";
import Face from "./Face";
import Footer, { FooterProps } from "./Footer";
import {
  addInterruptionBeganListener,
  addInterruptionEndedListener,
} from "@/modules/audio-interruption/src/AudioInterruptionModule";

const Marvin: React.FC = () => {
  const {
    disableBackgroundAudio,
    enableBackgroundAudio,
    permissionStatus,
    canAskAgain,
    requestMicPermission,
  } = useMic();
  const {
    agentMode,
    conversationStatus,
    endConversation,
    pauseConversation,
    resumeConversation,
    startNewConversation,
  } = useConversation();
  const { isInternetReachable } = useNetworkState();

  const primaryCta: ButtonProps | undefined = useMemo(() => {
    if (permissionStatus !== "granted") {
      return {
        label: "Grant permission",
        onPress: canAskAgain
          ? requestMicPermission
          : () => {
              Linking.openURL("app-settings:");
            },
      };
    }
    if (conversationStatus === ConversationStatus.ENDED) {
      return {
        label: "Start new chat",
        onPress: startNewConversation,
      };
    } else if (
      conversationStatus === ConversationStatus.PAUSED ||
      conversationStatus === ConversationStatus.DISRUPTED ||
      conversationStatus === ConversationStatus.RECONNECTING
    ) {
      return {
        label: "Reconnect",
        state:
          conversationStatus === ConversationStatus.RECONNECTING
            ? "loading"
            : "enabled",
        onPress: resumeConversation,
      };
    } else if (
      conversationStatus === ConversationStatus.PAUSING ||
      conversationStatus === ConversationStatus.CONNECTED ||
      conversationStatus === ConversationStatus.CONNECTING
    ) {
      return {
        label: "Pause chat",
        state:
          conversationStatus === ConversationStatus.PAUSING
            ? "loading"
            : conversationStatus === ConversationStatus.CONNECTING
            ? "disabled"
            : "enabled",
        onPress: pauseConversation,
      };
    }
  }, [
    canAskAgain,
    conversationStatus,
    permissionStatus,
    pauseConversation,
    resumeConversation,
    requestMicPermission,
    startNewConversation,
  ]);

  const footerMessage: FooterProps["message"] = useMemo(() => {
    if (permissionStatus !== "granted") {
      return {
        text: "Marvin needs permission to microphone in order to hear you :)",
        variant: "critical",
      };
    }
    if (!isInternetReachable) {
      return {
        text: "Oops! Looks like you're offline. Please check your internet connection.",
        variant: "critical",
      };
    }
    if (conversationStatus === ConversationStatus.CONNECTING) {
      return { text: "Booting up Marvin..." };
    } else if (conversationStatus === ConversationStatus.ENDED) {
      return { text: "Thanks for chatting!" };
    } else if (conversationStatus === ConversationStatus.DISRUPTED) {
      return {
        text: "Something is off. Is your internet connection working fine?",
        variant: "critical",
      };
    }
  }, [conversationStatus, isInternetReachable, permissionStatus]);

  useEffect(() => {
    const beganSub = addInterruptionBeganListener(() => {
      disableBackgroundAudio();
      pauseConversation(false);
    });
    const endSub = addInterruptionEndedListener(() => {
      enableBackgroundAudio();
    });

    return () => {
      beganSub.remove();
      endSub.remove();
    };
  }, [
    conversationStatus,
    pauseConversation,
    resumeConversation,
    disableBackgroundAudio,
    enableBackgroundAudio,
  ]);

  useEffect(() => {
    let timeout: number | undefined;
    if (
      isInternetReachable &&
      permissionStatus === "granted" &&
      conversationStatus === ConversationStatus.UNINITIALIZED
    ) {
      timeout = setTimeout(() => {
        startNewConversation();
      }, 4600);
    }
    return () => clearTimeout(timeout);
  }, [
    isInternetReachable,
    conversationStatus,
    permissionStatus,
    startNewConversation,
  ]);

  return (
    <Box flex={1} width="100%" height="100%" bg="white" px="l">
      <SafeTopSpace />
      <Box flex={1} width={"100%"} height="100%">
        <Box flex={1} justifyContent="center" alignItems="center" pb="xl">
          <Pressable onPress={startNewConversation}>
            <Face status={conversationStatus} mode={"speaking"} />
          </Pressable>
        </Box>

        <Footer primaryCta={primaryCta} message={footerMessage} />
      </Box>

      <SafeBottomSpace />
    </Box>
  );
};

export default Marvin;
