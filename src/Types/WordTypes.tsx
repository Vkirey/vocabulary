export type Word = {
  english: string;
  german: string;
  success?: boolean;
  userInput?: string;
};

export type WordsContextType = {
  words: Array<Word>;
  addWord: (english: string, german: string) => void;
  deleteWordByIndex: (index: number) => void;
};

export type ScoreType = {
  success: boolean;
  userInput: string;
};
