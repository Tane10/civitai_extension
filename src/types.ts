// client -> background
export enum ClientActions {
  SET_API_KEY = "SET_API_KEY",
  REQUEST_API_KEY = "REQUEST_API_KEY",
  SEND_PROMPT = "SEND_PROMPT",
  CHECK_JOB = "CHECK_JOB",
}

// background -> client
export enum BackgroundActions {
  SEND_API_KEY = "SEND_API_KEY",
  GENERATION_RESULTS = "GENERATION_RESULTS",
  QUERY_RESULTS = "QUERY_RESULTS",
}

export type ActionTypes = ClientActions | BackgroundActions;

export interface Message {
  uuid: string; // Unique identifier
  action: string; // Action name
  value: string | Record<any, any>; // Either a string or a record object
  valid: boolean; // Indicates if the message is valid
  error: string | null; // Optional error message (stringified JSON)
  timestamp: number; // Epoch timestamp (in milliseconds)
  PEM_KEY?: string; // Optional PEM key (if any)
}
