import useMicState from "@/hooks/useMic";
import { AppState, Linking, Pressable } from "react-native";
import Button, { ButtonProps } from "./Button";
import { useEffect } from "react";
import useConversation from "@/hooks/useConversation";
import { ConversationStatus } from "@/utils/types";
import { useNetworkState } from "expo-network";
import { Box, SafeBottomSpace, SafeTopSpace, Text } from "./foundation";
import Banner from "./Banner";
import Face from "./Face";
import Footer, { FooterProps } from "./Footer";

const Marvin: React.FC = () => {
  const { permissionStatus, canAskAgain, requestMicPermission } = useMicState();
  const {
    conversationStatus,
    endConversation,
    pauseConversation,
    resumeConversation,
    startNewConversation,
    mute,
    unmute,
  } = useConversation();
  const { isInternetReachable } = useNetworkState();

  useEffect(() => {
    AppState.addEventListener("change", (state) => {
      if (
        state === "background" &&
        conversationStatus === ConversationStatus.CONNECTED
      ) {
        pauseConversation();
      } else if (
        state === "active" &&
        conversationStatus === ConversationStatus.DISRUPTED
      ) {
        resumeConversation();
      }
    });
  }, [conversationStatus, pauseConversation, resumeConversation]);

  if (permissionStatus !== "granted") {
    return (
      <Box flex={1} bg="white">
        <Box
          flex={1}
          width="100%"
          height="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Text variant="body">
            Microphone permission is required to start the conversation.
          </Text>

          <Button
            label="Grant permission"
            onPress={
              canAskAgain
                ? requestMicPermission
                : () => {
                    Linking.openURL("app-settings:");
                  }
            }
          />
        </Box>

        {!isInternetReachable && (
          <Text variant="body">
            Oops! It looks like you have a bad internet connection.
          </Text>
        )}
      </Box>
    );
  }

  const getPrimaryCta: () => ButtonProps | undefined = () => {
    if (
      conversationStatus === ConversationStatus.ENDED ||
      conversationStatus === ConversationStatus.UNINITIALIZED
    ) {
      return {
        label: "Start new chat",
        state: "enabled",
        onPress: startNewConversation,
      };
    } else if (
      conversationStatus === ConversationStatus.PAUSED ||
      conversationStatus === ConversationStatus.DISRUPTED
    ) {
      return {
        label: "Resume chat",
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
  };

  const getSecondaryCta: () => ButtonProps | undefined = () => {
    if (
      conversationStatus === ConversationStatus.CONNECTED ||
      conversationStatus === ConversationStatus.CONNECTING ||
      conversationStatus === ConversationStatus.PAUSING ||
      conversationStatus === ConversationStatus.PAUSED ||
      conversationStatus === ConversationStatus.ENDING ||
      conversationStatus === ConversationStatus.DISRUPTED
    ) {
      return {
        label: "End chat",
        onPress: endConversation,
        state:
          conversationStatus === ConversationStatus.PAUSING
            ? "disabled"
            : conversationStatus === ConversationStatus.ENDING
            ? "loading"
            : "enabled",
        variant: "critical",
      };
    }
  };

  const getMessage = () => {
    if (conversationStatus === ConversationStatus.UNINITIALIZED) {
      return "This is Marvin - a manically depressed robot. Tap and say hi... but don't talk to him about life.";
    } else if (conversationStatus === ConversationStatus.CONNECTING) {
      return "Firing up it's diodes...";
    } else if (conversationStatus === ConversationStatus.ENDED) {
      return "Thanks for chatting!";
    } else if (conversationStatus === ConversationStatus.DISRUPTED) {
      return "Something went wrong! Please check your internet connection and try again.";
    }
  };

  // {!isInternetReachable && (
  //   <Text variant="body">
  //     Oops! It looks like you have a bad internet connection.
  //   </Text>
  // )}

  return (
    <Box flex={1} bg="white" px="l">
      <SafeTopSpace />
      <Box flex={1}>
        <Box flex={1} justifyContent="center" alignItems="center">
          <Pressable onPress={startNewConversation}>
            <Face status={conversationStatus} />
          </Pressable>
        </Box>

        <Footer
          primaryCta={getPrimaryCta()}
          secondaryCta={getSecondaryCta()}
          message={getMessage()}
        />
      </Box>

      <SafeBottomSpace />
    </Box>
  );
};

export default Marvin;
