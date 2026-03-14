import { ElevenLabsProvider } from "@elevenlabs/react-native";
import Marvin from "@/components/Marvin";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <ElevenLabsProvider>
      <Marvin />
    </ElevenLabsProvider>
  );
}
