/**
 * Type of word. Used in whole application, actually extends ScoreType but with a difference in field optionality
 */
export type Word = {
  english: string;
  german: string;
  success?: boolean;
  userInput?: string;
};

/**
 * Context type to store all data we need in word provider with possible actions to mutate it
 */
export type WordsContextType = {
  words: Array<Word>;
  addWord: (english: string, german: string) => void;
  deleteWordByIndex: (index: number) => void;
};

/**
 * Type to store data regarding user's interaction in test
 */
export type ScoreType = {
  success: boolean;
  userInput: string;
};
