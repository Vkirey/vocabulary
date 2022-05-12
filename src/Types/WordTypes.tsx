export type Word = {
    english: string;
    german: string;
    success?: boolean
}

export type WordsContextType = {
    words: Array<Word>;
    addWord: (english: string, german: string) => void
    deleteWordByIndex: (index: number) => void
}