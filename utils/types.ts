export enum ConversationStatus {
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
