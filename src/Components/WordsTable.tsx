import * as Rect from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useWords } from "../Providers/WordsProvider";
import { LANGUAGES } from "../constants";
import { useLanguage } from "../Providers/LanguageProvider";
import { Word } from "../Types/WordTypes";
import ConfirmDialog from "./ConfirmationDialog";

const ROWS_PER_PAGE_OPTIONS: Array<number> = [5, 10, 20];

interface WordsTableProps {
  wordsData?: Array<Word>;
}

// Main component for the table.
// Usually it's good to have rows components separated but in this case they are really small and only will create more complexity passing events to.
export const WordsTable: React.FC<WordsTableProps> = ({ wordsData }) => {
  const { words, deleteWordByIndex } = useWords();
  const { language } = useLanguage();

  const [page, setPage] = Rect.useState(0);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    Rect.useState(false);
  const [rowsPerPage, setRowsPerPage] = Rect.useState(
    wordsData ? 20 : ROWS_PER_PAGE_OPTIONS[0]
  );

  const isEng = Rect.useMemo(
    () => language === LANGUAGES.ENG_TO_GER,
    [language]
  );

  // Here we use ref instead of state as this is private logical variable which we don't need to cause re-rendering checks
  const indexToDelete = Rect.useRef(0);

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  const onRowsPerPageChange: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setPage(0);
  };

  const dataToShow: Array<Word> = Rect.useMemo(() => {
    if (wordsData) {
      return wordsData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    }
    return words.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [words, rowsPerPage, page]);

  const tryDelete = Rect.useCallback((index: number) => {
    indexToDelete.current = index;
    setShowDeleteConfirmation(true);
  }, []);

  const proceedDelete = Rect.useCallback(() => {
    deleteWordByIndex(indexToDelete.current);
  }, [indexToDelete]);

  return (
    <>
      <ConfirmDialog
        open={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        title="Are you sure you want to delete this word? It may be most needed one in your future, think wise."
        onConfirm={proceedDelete}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell align="right">
                {isEng ? "English" : "German"}
              </TableCell>
              <TableCell align="left">{isEng ? "German" : "English"}</TableCell>
              {wordsData && <TableCell align="right">Your input</TableCell>}
              {!wordsData && <TableCell align="right" width={"10%"} />}
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToShow.map((row, index) => (
              <TableRow
                key={`word-${index}`}
                sx={{
                  border: 0,
                  ...(wordsData
                    ? row.success
                      ? { background: "lightgreen" }
                      : { background: "red" }
                    : {}),
                }}
              >
                <TableCell align="right">
                  {isEng ? row.english : row.german}
                </TableCell>
                <TableCell align="left">
                  {isEng ? row.german : row.english}
                </TableCell>
                {wordsData && (
                  <TableCell align="right">{row.userInput ?? ""}</TableCell>
                )}
                {!wordsData && (
                  <TableCell align="right">
                    <Button onClick={() => tryDelete(index)} >X</Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!wordsData && (
          <TablePagination
            align="center"
            count={words.length}
            page={page}
            onPageChange={onPageChange}
            rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
            rowsPerPage={rowsPerPage}
            component="div"
            onRowsPerPageChange={onRowsPerPageChange}
            labelRowsPerPage="Rows per page"
          />
        )}
      </TableContainer>
    </>
  );
};
