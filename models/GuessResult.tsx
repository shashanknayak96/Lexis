import { GuessStatus } from "../enums/GuessStatus";

export type GuessResult = {
  letter: string;
  status: GuessStatus;
};
