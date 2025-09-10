import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import type { TestResult } from "../types/auth";
import Diagram from "../Diagram/Diagram";
import css from "./ResultsPage.module.css";

const ResultsPage = () => {
    const location = useLocation();
    const results = location.state?.results as TestResult | undefined;
    const totalQuestions = location.state?.totalQuestions as number | undefined;
    const taskName = location.state?.taskName as string | undefined;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (!results || totalQuestions === undefined) {
        return <div>No results to display.</div>;
    }

    const correctAnswers = Math.round(
        (parseInt(results.result) / 100) * totalQuestions
    );
    const incorrectAnswers = totalQuestions - correctAnswers;

    const correctPercent = Math.round((correctAnswers / totalQuestions) * 100);
    const incorrectPercent = Math.round(
        (incorrectAnswers / totalQuestions) * 100
    );

    const legendData = [
        { name: "Correct", value: correctPercent, color: "#ff6b09" },
        { name: "Incorrect", value: incorrectPercent, color: "#d7d7d7" },
    ];

    return (
        <div className={css.resultsContainer}>
            <h2 className={css.title}>Results</h2>
            <div className={css.resultBox}>
                <div className={css.resultHeader}>
                    <p className={css.resultText}>
                        {taskName ? `[ ${taskName}_]` : "Task not selected"}
                    </p>
                    <div className={css.lineContainer}></div>
                </div>
                <div className={css.chartAndInfo}>
                    <Diagram
                        correctAnswers={correctAnswers}
                        incorrectAnswers={incorrectAnswers}
                        width={isMobile ? 156 : 300}
                        height={isMobile ? 156 : 300}
                        radius={isMobile ? 70 : 143}
                    />
                    <div className={css.answerCounts}>
                        {legendData.map((entry, index) => (
                            <div key={index} className={css.legendItem}>
                                <span
                                    className={css.legendColorBox}
                                    style={{ backgroundColor: entry.color }}
                                ></span>
                                <p>
                                    {entry.name}: {entry.value}%
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={css.messages}>
                    <div className={css.messageCounts}>
                        <div>
                            Correct answers - <span>{correctAnswers}</span>
                        </div>
                        <div className={css.verticalDivider}></div>
                        <div>
                            Total questions - <span>{totalQuestions}</span>
                        </div>
                    </div>
                    <img
                        src="/img/cat-love.webp"
                        alt="Cat GoIT Logo"
                        className={css.catImage}
                    />
                    <p className={css.mainMessage}>{results.mainMessage}</p>
                    <p className={css.secondaryMessage}>
                        {results.secondaryMessage}
                    </p>
                </div>
            </div>
            <Link to="/" className={css.tryAgainButton}>
                Try again
            </Link>
        </div>
    );
};

export default ResultsPage;
