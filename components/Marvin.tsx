import useMicState from "@/hooks/useMic";
import { AppState, Linking, Pressable } from "react-native";
import Button from "./Button";
import { useEffect } from "react";
import useConversation from "@/hooks/useConversation";
import { ConversationStatus } from "@/utils/types";
import { useNetworkState } from "expo-network";
import { Box, Text } from "./foundation";

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

  console.log({ conversationStatus });

  return (
    <Box flex={1} bg="white" px="l">
      <Box
        flex={1}
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Pressable onPress={startNewConversation}>
          <Box
            borderRadius={100}
            width={200}
            height={200}
            backgroundColor={
              conversationStatus === ConversationStatus.CONNECTED
                ? "greenDark"
                : "lightGray"
            }
            marginBottom={"l"}
          />
        </Pressable>

        <Text variant="bodySmall" color="gray" textAlign="center">
          {conversationStatus === ConversationStatus.UNINITIALIZED
            ? "This is Marvin the Paranoid Android.\nSay hi... but don't talk to him about life."
            : conversationStatus === ConversationStatus.CONNECTING
            ? "Connecting to servers..."
            : conversationStatus === ConversationStatus.ENDED
            ? "Thanks for chatting with Marvin.\nFeel free to speak again!"
            : null}
        </Text>

        {conversationStatus === ConversationStatus.CONNECTED ? (
          <Box flexDirection="row" justifyContent="center" alignItems="center">
            <Button label="Pause conversation" onPress={pauseConversation} />
            <Box width={16} />
            <Button label="End conversation" onPress={endConversation} />
          </Box>
        ) : null}

        {conversationStatus === ConversationStatus.DISRUPTED ? (
          <>
            <Text variant="bodySmall" color="gray" textAlign="center" mb="m">
              Something went wrong! Please check your internet connection and
              try again
            </Text>
            <Button label="Resume conversation" onPress={resumeConversation} />
          </>
        ) : null}
      </Box>

      {!isInternetReachable && (
        <Text variant="body">
          Oops! It looks like you have a bad internet connection.
        </Text>
      )}
    </Box>
  );
};

export default Marvin;
