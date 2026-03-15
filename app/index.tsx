import { ElevenLabsProvider } from "@elevenlabs/react-native";
import Marvin from "@/components/Marvin";
import Story from "@/components/Story";

export default function Index() {
  return (
    <ElevenLabsProvider>
      <Story>
        <Marvin />
      </Story>
    </ElevenLabsProvider>
  );
}
