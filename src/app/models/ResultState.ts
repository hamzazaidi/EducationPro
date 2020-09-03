import { Result } from "./Result";

export interface ResultState {
  resultsHistory: {
    isLoading: boolean;
    results: Result[]
  }
}