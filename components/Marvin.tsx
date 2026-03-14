import useMic from "@/hooks/useMic";
import { useConversation } from "@elevenlabs/react-native";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
    backgroundColor: "#ccc",
    width: 200,
    height: 200,
  },
});

const Marvin: React.FC = () => {
  const { permissionStatus } = useMic();

  const conversation = useConversation({
    onConnect: () => console.log("Connected to conversation"),
    onDisconnect: () => console.log("Disconnected from conversation"),
    onMessage: (message) => console.log("Received message:", message),
    onError: (error) => console.error("Conversation error:", error),
    onModeChange: (mode) => console.log("Conversation mode changed:", mode),
    onStatusChange: (prop) =>
      console.log("Conversation status changed:", prop.status),
    onCanSendFeedbackChange: (prop) =>
      console.log("Can send feedback changed:", prop.canSendFeedback),
    onUnhandledClientToolCall: (params) =>
      console.log("Unhandled client tool call:", params),
    onAudioAlignment: (alignment) =>
      console.log("Alignment data received:", alignment),
    onAgentChatResponsePart: (part) => console.log("Chat response part:", part),
  });

  const startConversation = async () => {
    await conversation.startSession({
      agentId: "agent_9501kkn62xxge6jac724nnwgp7sv",
    });
  };

  const endConversation = async () => {
    await conversation.endSession();
  };

  if (permissionStatus !== "granted") {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          Microphone permission is required to start the conversation.
        </Text>

        <Pressable>
          <View
            style={{
              height: 48,
              paddingHorizontal: 16,
              backgroundColor: "#007AFF",
              borderRadius: 8,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Try again</Text>
          </View>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, {}]}>
      <Pressable onPress={startConversation}>
        <View style={[styles.face]} />
      </Pressable>
    </View>
  );
};

export default Marvin;
