import * as React from "react";
import { Word } from "../../Types/WordTypes";
import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { useLanguage } from "../../Providers/LanguageProvider";
import { LANGUAGES } from "../../constants";

const WordCheckerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
`;

interface WordCheckerProps {
  wordsForTest: Array<Word>;
  currentWordIndex: number;
  onNext: (success: boolean) => void;
}

export const WordChecker: React.FC<WordCheckerProps> = ({
  wordsForTest,
  currentWordIndex,
  onNext,
}) => {
  const { language } = useLanguage();

  const isEng = React.useMemo(() => language === LANGUAGES.ENG_TO_GER, [language])

  const [translation, setTranslation] = React.useState("");
  const [word, setWord] = React.useState<Word>();

  React.useEffect(() => {
    setWord(wordsForTest[currentWordIndex]);
  }, [currentWordIndex, wordsForTest]);

  const checkWord = React.useCallback(() => {
    onNext(
        isEng
        ? translation.toLowerCase() === word?.german.toLowerCase()
        : translation.toLowerCase() === word?.english.toLowerCase()
    );
    setTranslation('')
  }, [translation, word, isEng, onNext]);

  const keyPress: React.KeyboardEventHandler = React.useCallback(
    (e) => {
      if (e.key === "Enter" && translation) {
        checkWord();
      }
    },
    [checkWord, translation]
  );

  

  return (
    <WordCheckerContainer>
      <TextField
        variant="filled"
        disabled
        value={isEng ? word?.english : word?.german}
      />
      {isEng ? 'is a...' : 'ist ein...'}
      <TextField
        onKeyDown={keyPress}
        label={isEng ? "German" : "English"}
        variant="filled"
        value={translation}
        onChange={(e) => setTranslation(e.target.value)}
      />
      <Button
        variant="contained"
        disabled={!translation}
        onClick={() => checkWord()}
      >
        Submit
      </Button>
    </WordCheckerContainer>
  );
};
