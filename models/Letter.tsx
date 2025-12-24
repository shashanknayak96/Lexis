import type { GuessStatus } from "../enums/GuessStatus";

export interface Letter {
  letter: string;
  status: GuessStatus;
}
