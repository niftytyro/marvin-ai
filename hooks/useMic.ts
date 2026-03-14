import { useCallback, useEffect, useState } from "react";
import {
  getRecordingPermissionsAsync,
  PermissionStatus,
  requestRecordingPermissionsAsync,
} from "expo-audio";

const useMic = () => {
  const [permissionStatus, setPermissionStatus] = useState<
    PermissionStatus | undefined
  >();

  const checkPermissions = useCallback(async () => {
    const { canAskAgain, granted } = await getRecordingPermissionsAsync();
    //     if (granted) {
    //       setPermissionStatus(PermissionStatus.GRANTED);
    //     } else if (canAskAgain) {
    //       const { status: requestStatus } =
    //         await requestRecordingPermissionsAsync();
    //       if (requestStatus === "granted") {
    //         setPermissionStatus(PermissionStatus.GRANTED);
    //       } else {
    //         setPermissionStatus(PermissionStatus.DENIED);
    //       }
    //     }
  }, []);

  useEffect(() => {
    checkPermissions();
  }, [checkPermissions]);

  return { permissionStatus };
};

export default useMic;
