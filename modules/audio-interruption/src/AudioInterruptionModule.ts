import { requireNativeModule } from "expo-modules-core";

const AudioInterruptionModule = requireNativeModule("AudioInterruption");

export function addInterruptionBeganListener(listener: () => void) {
  return AudioInterruptionModule.addListener("onInterruptionBegan", listener);
}

export function addInterruptionEndedListener(listener: () => void) {
  return AudioInterruptionModule.addListener("onInterruptionEnded", listener);
}
