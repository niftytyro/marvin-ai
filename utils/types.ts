export enum ConversationStatus {
  UNINITIALIZED = "UNINITIALIZED",
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
  PAUSING = "PAUSING",
  PAUSED = "PAUSED",
  ENDING = "ENDING",
  ENDED = "ENDED",
  DISRUPTED = "DISRUPTED",
}

export type ElevenLabsStatus =
  | "connected"
  | "connecting"
  | "disconnected"
  | "disconnecting";
