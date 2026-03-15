import { useCallback, useEffect, useState } from "react";
import {
  getRecordingPermissionsAsync,
  PermissionStatus,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";

const useMic = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionStatus | undefined
  >();
  const [canAskAgain, setCanAskAgain] = useState<boolean | undefined>(
    undefined
  );

  const requestMicPermission = useCallback(async () => {
    const { canAskAgain, granted } = await getRecordingPermissionsAsync();

    setCanAskAgain(canAskAgain);

    if (granted) {
      setPermissionStatus(PermissionStatus.GRANTED);
    } else if (canAskAgain) {
      const { status: requestStatus } =
        await requestRecordingPermissionsAsync();
      if (requestStatus === "granted") {
        setPermissionStatus(PermissionStatus.GRANTED);
      } else {
        setPermissionStatus(PermissionStatus.DENIED);
      }
    }
  }, []);

  const disableBackgroundAudio = useCallback(async () => {
    await setAudioModeAsync({
      playsInSilentMode: false,
      shouldPlayInBackground: false,
      interruptionMode: "mixWithOthers",
      allowsRecording: false,
    });
  }, []);

  const enableBackgroundAudio = useCallback(async () => {
    await setAudioModeAsync({
      playsInSilentMode: false,
      shouldPlayInBackground: false,
      interruptionMode: "mixWithOthers",
      allowsRecording: false,
    });
  }, []);

  useEffect(() => {
    requestMicPermission();
  }, [requestMicPermission]);

  useEffect(() => {
    enableBackgroundAudio();
  }, [enableBackgroundAudio]);

  return {
    permissionStatus,
    canAskAgain,
    requestMicPermission,
    enableBackgroundAudio,
    disableBackgroundAudio,
  };
};

export default useMic;
