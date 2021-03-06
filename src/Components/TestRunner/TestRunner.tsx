import * as React from "react";
import { LinearProgress } from "@mui/material";
import { COUNT_OF_WORDS_IN_TEST } from "../../constants";
import { useWords } from "../../Providers/WordsProvider";
import { ScoreType, Word } from "../../Types/WordTypes";
import { WordChecker } from "./WordChecker";
import { ResultView } from "./ResultView";

export const TestRunner: React.FC = () => {
  const { words } = useWords();

  const [wordsForTest, setWordsForTest] = React.useState<Array<Word>>([]);
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [score, setScore] = React.useState<Array<ScoreType>>([])

  // Preparation for the test (20 or COUNT_OF_WORDS_IN_TEST words pick-up)
  React.useEffect(() => {
    if (words.length > COUNT_OF_WORDS_IN_TEST) {
      setWordsForTest(words.sort(() => 0.5 - Math.random()).slice(0, COUNT_OF_WORDS_IN_TEST));
    } else {
      setWordsForTest(words.sort(() => 0.5 - Math.random()));
    }
  }, [words, setWordsForTest]);

  const onNextWordHandler = React.useCallback((userInput: ScoreType) =>
  {
      setCurrentWordIndex((currentWordIndex) => ++currentWordIndex)
      setScore(score => [...score, userInput])
  }, [setScore, setCurrentWordIndex])

  return currentWordIndex === wordsForTest.length ? (
    <ResultView score={score} wordsForTest={wordsForTest} />
  ) : (
    <>
      <LinearProgress 
        value={currentWordIndex/wordsForTest.length * 100} variant="determinate"
        style={{ marginBottom: '25px' }}
      />
      <WordChecker
        wordsForTest={wordsForTest}
        currentWordIndex={currentWordIndex}
        onNext={onNextWordHandler}
      />
    </>
  );
};
