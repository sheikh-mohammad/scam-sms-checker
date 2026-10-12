export type Verdict = "SCAM" | "PROBABLY SCAM" | "LOOKS SAFE";

export interface Bilingual {
  ur: string;
  en: string;
}

export interface VerdictResult {
  verdict: Verdict;
  redFlags: Bilingual[];
  action: Bilingual;
  explanation: Bilingual;
  certaintyNote: Bilingual;
}

export interface CheckSuccess {
  ok: true;
  result: VerdictResult;
}

export type ErrorCode =
  | "EMPTY"
  | "TOO_LONG"
  | "BAD_REQUEST"
  | "NOT_CONFIGURED"
  | "TIMEOUT"
  | "PROVIDER_ERROR";

export interface CheckFailure {
  ok: false;
  code: ErrorCode;
}

export type CheckResponse = CheckSuccess | CheckFailure;

export const VERDICTS: readonly Verdict[] = [
  "SCAM",
  "PROBABLY SCAM",
  "LOOKS SAFE",
];

export const MAX_MESSAGE_LENGTH = 2000;
