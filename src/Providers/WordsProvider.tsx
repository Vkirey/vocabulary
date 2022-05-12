import * as React from 'react'
import { LSHelper } from '../Helpers/LocalStorageHelper'
import { Word, WordsContextType } from '../Types/WordTypes'

export const WordsContext: React.Context<WordsContextType | null> = React.createContext<WordsContextType | null>(null)

export const WordsProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [words, setWords] = React.useState(new Array<Word>())

    const addWord = React.useCallback((english: string, german: string) => {
        setWords(words => [...words, { english, german }])
    }, [setWords])

    // Here we trying to read stored words from local storage, if there is no data or we're failed for some reason (corrupted data etc.) we clear it
    // And on every next change of words (adding / removing) - we update local storage accordingly
    React.useEffect(() => {
        if(words.length < 1) {
            const wordsStored = LSHelper.get('words')
            if(wordsStored) {
                try {
                    const wordsParsed: Array<Word> = JSON.parse(wordsStored)
                    setWords(wordsParsed)
                } catch(e) {
                    console.error('Failed to get exising words from local storage. Data may be corrupted, clearing it to empty list')
                    LSHelper.remove('words')
                }
            }
        } else {
            LSHelper.remove('words')
            LSHelper.add('words', JSON.stringify(words))
        }
    }, [words])

    const deleteWordByIndex = (index: number) => {
        setWords(words => words.filter((_, ind) => ind !== index))
    }
    
    return <WordsContext.Provider
        value={{
            words,
            addWord,
            deleteWordByIndex
        }}
    >{children}</WordsContext.Provider>
}

export const useWords = (): WordsContextType => {
    const wordsContext = React.useContext(WordsContext);
    if (!wordsContext) {
      throw new Error(
        'useWords() hook requires a <WordsProvider> higher in the tree',
      );
    }

    return wordsContext
}