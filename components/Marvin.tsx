import useMicState from "@/hooks/useMic";
import {
  AppState,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Button from "./Button";
import { useEffect } from "react";
import useConversation from "@/hooks/useConversation";
import { ConversationStatus } from "@/utils/types";
import { useNetworkState } from "expo-network";

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

const Marvin: React.FC = () => {
  const { permissionStatus, canAskAgain, requestMicPermission } = useMicState();
  const {
    conversationStatus,
    endConversation,
    pauseConversation,
    resumeConversation,
    startNewConversation,
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
      <View style={{ flex: 1 }}>
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

        {!isInternetReachable && (
          <Text>Oops! It looks like you have a bad internet connection.</Text>
        )}
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Pressable onPress={startNewConversation}>
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
        </Pressable>

        {conversationStatus === ConversationStatus.CONNECTED ? (
          <>
            <Button label="Pause conversation" onPress={pauseConversation} />
            <Button label="End conversation" onPress={endConversation} />
          </>
        ) : null}

        {conversationStatus === ConversationStatus.DISRUPTED ? (
          <>
            <Button label="Resume conversation" onPress={resumeConversation} />
          </>
        ) : null}
      </View>

      {!isInternetReachable && (
        <Text
          style={{
            marginBottom: 24,
            marginHorizontal: 20,
            textAlign: "center",
          }}
        >
          Oops! It looks like you have a bad internet connection.
        </Text>
      )}
    </View>
  );
};

export default Marvin;
