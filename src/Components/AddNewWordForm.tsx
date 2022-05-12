import * as React from "react";
import { TextField, Button, Snackbar, Alert, AlertColor } from "@mui/material";
import { useWords } from "../Providers/WordsProvider";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../Providers/LanguageProvider";
import { LANGUAGES } from "../constants";

const AddNewWordFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const DoubleInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
`;

export const AddNewWordForm: React.FC = () => {
  const navigate = useNavigate();
  const [english, setEnglish] = React.useState("");
  const [german, setGerman] = React.useState("");

  const [showSnack, setShowSnack] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState<AlertColor>();
  const [snackMsg, setSnackMsg] = React.useState("");

  const { language } = useLanguage();
  const { words, addWord } = useWords();

  const addWordHandler = React.useCallback(() => {
    if (words.find((x) => x.english === english || x.german === german)) {
      setSnackSeverity("error");
      setSnackMsg("This word already exists");
      setShowSnack(true);
      return;
    }
    addWord(english, german);
    setEnglish("");
    setGerman("");
    setSnackSeverity("success");
    setSnackMsg("New word added!");
    setShowSnack(true);
  }, [addWord, english, german, words]);

  const keyPress: React.KeyboardEventHandler = React.useCallback(
    (e) => {
      if (e.key === "Enter" && english && german) {
        addWordHandler();
      }
    },
    [english, german, addWordHandler]
  );

  const goToTest = React.useCallback(() => {
    navigate("/test");
  }, [navigate]);

  return (
    <AddNewWordFormWrapper>
      <Snackbar open={showSnack} autoHideDuration={2000}>
        <Alert severity={snackSeverity}>{snackMsg}</Alert>
      </Snackbar>
      <DoubleInputContainer>
        {language === LANGUAGES.ENG_TO_GER ? (
          <>
            <TextField
              onKeyDown={keyPress}
              label="English"
              variant="filled"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
            />
            <TextField
              onKeyDown={keyPress}
              label="German"
              variant="filled"
              value={german}
              onChange={(e) => setGerman(e.target.value)}
            />
          </>
        ) : (
          <>
            <TextField
              onKeyDown={keyPress}
              label="German"
              variant="filled"
              value={german}
              onChange={(e) => setGerman(e.target.value)}
            />
            <TextField
              onKeyDown={keyPress}
              label="English"
              variant="filled"
              value={english}
              onChange={(e) => setEnglish(e.target.value)}
            />
          </>
        )}
        <Button
          variant="contained"
          disabled={!english || !german}
          onClick={() => addWordHandler()}
        >
          Add Word
        </Button>
      </DoubleInputContainer>

      <Button
        variant="contained"
        disabled={words.length < 1}
        onClick={() => goToTest()}
      >
        Test me!
      </Button>
    </AddNewWordFormWrapper>
  );
};
