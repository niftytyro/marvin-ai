import { useCallback, useEffect, useState } from "react";
import {
  getRecordingPermissionsAsync,
  PermissionStatus,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";

const setAudioMode = async () => {
  // Configure audio for background playback with mixing
  await setAudioModeAsync({
    playsInSilentMode: true,
    shouldPlayInBackground: true,
    interruptionMode: "duckOthers",
    allowsRecording: true,
  });
};

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

  useEffect(() => {
    requestMicPermission();
  }, [requestMicPermission]);

  useEffect(() => {
    setAudioMode();
    console.log(
      "We set the audio mode for background playback and mixing with other apps."
    );
  }, []);

  return { permissionStatus, canAskAgain, requestMicPermission };
};

export default useMic;
