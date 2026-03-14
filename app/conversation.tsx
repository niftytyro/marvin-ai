import { ElevenLabsProvider } from "@elevenlabs/react-native";
import Marvin from "@/components/Marvin";

export default function Index() {
  return (
    <ElevenLabsProvider>
      <Marvin />
    </ElevenLabsProvider>
  );
}
