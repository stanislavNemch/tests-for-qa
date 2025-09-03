import { useLocation, Link } from "react-router-dom";
import type { TestResult } from "../types/auth";
import Diagram from "../Diagram/Diagram";
import css from "./ResultsPage.module.css";

const ResultsPage = () => {
    const location = useLocation();
    const results = location.state?.results as TestResult | undefined;
    const totalQuestions = location.state?.totalQuestions as number | undefined;

    if (!results || totalQuestions === undefined) {
        return <div>No results to display.</div>;
    }

    const correctAnswers = Math.round(
        (parseInt(results.result) / 100) * totalQuestions
    );
    const incorrectAnswers = totalQuestions - correctAnswers;

    return (
        <div className={css.resultsContainer}>
            <h2 className={css.title}>Test Results</h2>
            <div className={css.resultBox}>
                <p className={css.resultText}>Your result: {results.result}</p>
                <div className={css.chartAndInfo}>
                    <Diagram
                        correctAnswers={correctAnswers}
                        incorrectAnswers={incorrectAnswers}
                    />
                    <div className={css.answerCounts}>
                        <p>Correct: {correctAnswers}</p>
                        <p>Incorrect: {incorrectAnswers}</p>
                    </div>
                </div>
                <p className={css.mainMessage}>{results.mainMessage}</p>
                <p className={css.secondaryMessage}>{results.secondaryMessage}</p>
            </div>
            <Link to="/" className={css.tryAgainButton}>
                Пройти ще раз
            </Link>
        </div>
    );
};

export default ResultsPage;
