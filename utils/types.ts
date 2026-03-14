export enum ConversationStatus {
  UNINITIALIZED,
  CONNECTED,
  CONNECTING,
  PAUSING,
  PAUSED,
  ENDING,
  ENDED,
  DISRUPTED,
}

export type ElevenLabsStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "disconnecting";
