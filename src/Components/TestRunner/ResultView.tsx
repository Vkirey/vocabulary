import * as React from "react";
import { ScoreType, Word } from "../../Types/WordTypes";
import { WordsTable } from "../WordsTable";

interface ResultViewProps {
    score: Array<ScoreType>;
    wordsForTest: Array<Word>;
}

export const ResultView: React.FC<ResultViewProps> = ({ score, wordsForTest }) => {

    const calculatedScorePercentage = React.useMemo(() => (score.filter(x => x).length / score.length) * 100, [score])

    const data: Array<Word> = React.useMemo(() => wordsForTest.map((w, index) => { 
        w.success = score[index].success; 
        w.userInput = score[index].userInput
        return w;
    }), [wordsForTest, score])

    return <>
    <h3>Your score is {calculatedScorePercentage}%</h3>
    <WordsTable wordsData={data} />
    </>
}