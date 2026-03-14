export enum ConversationStatus {
  CONNECTED,
  CONNECTING,
  ENDED,
  DISRUPTED,
}

export type ElevenLabsStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "disconnecting";
