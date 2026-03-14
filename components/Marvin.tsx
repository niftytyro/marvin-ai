import useMicState from "@/hooks/useMic";
import { useConversation } from "@elevenlabs/react-native";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import Button from "./Button";
import { useCallback, useEffect, useState } from "react";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  face: {
    borderRadius: 100,
    width: 200,
    height: 200,
  },
});

enum ConversationStatus {
  CONNECTED,
  DISCONNECTED,
  CONNECTING,
}

const Marvin: React.FC = () => {
  const { permissionStatus, canAskAgain, requestMicPermission } = useMicState();
  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>(ConversationStatus.DISCONNECTED);

  const conversation = useConversation({
    onConnect: () => setConversationStatus(ConversationStatus.CONNECTED),
    // onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    // onError: (error) => console.error("Conversation error:", error),
    // onModeChange: (mode) => console.log("Conversation mode changed:", mode),
    onStatusChange: (prop) => {
      console.log("Conversation status changed:", prop.status);
      setConversationStatus(
        prop.status === "connected"
          ? ConversationStatus.CONNECTED
          : prop.status === "connecting"
          ? ConversationStatus.CONNECTING
          : ConversationStatus.DISCONNECTED
      );
    },
    // onCanSendFeedbackChange: (prop) =>
    //   console.log("Can send feedback changed:", prop.canSendFeedback),
    // onUnhandledClientToolCall: (params) =>
    //   console.log("Unhandled client tool call:", params),
    // onAudioAlignment: (alignment) =>
    //   console.log("Alignment data received:", alignment),
    // onAgentChatResponsePart: (part) => console.log("Chat response part:", part),
  });

  const startConversation = async () => {
    await conversation.startSession({
      agentId: "agent_9501kkn62xxge6jac724nnwgp7sv",
    });
  };

  const endConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  useEffect(() => {
    console.log("Conversation status:", conversationStatus);
  }, [conversationStatus]);

  if (permissionStatus !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
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
      </View>
    );
  }

  return (
    <View style={[styles.container, {}]}>
      <Pressable onPress={startConversation}>
        <View
          style={[
            styles.face,
            {
              backgroundColor:
                conversationStatus === ConversationStatus.CONNECTED
                  ? "#d86882"
                  : "#999",
              marginBottom: 24,
            },
          ]}
        />

        {conversationStatus === ConversationStatus.CONNECTED ? (
          <Button label="End conversation" onPress={endConversation} />
        ) : null}
      </Pressable>
    </View>
  );
};

export default Marvin;
