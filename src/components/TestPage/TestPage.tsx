import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { Question, Answer } from "../types/auth";
import css from "./TestPage.module.css";

const TestPage = () => {
    const { testType } = useParams<{ testType: string }>();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await (testType === "tech"
                    ? authService.getTechQuestions()
                    : authService.getTheoryQuestions());
                setQuestions(response.data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, [testType]);

    const handleAnswerChange = (answer: string) => {
        const newAnswer: Answer = {
            questionId: questions[currentQuestionIndex].questionId,
            answer,
        };
        setUserAnswers([
            ...userAnswers.filter((a) => a.questionId !== newAnswer.questionId),
            newAnswer,
        ]);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleFinishTest = async () => {
        try {
            const response = await (testType === "tech"
                ? authService.sendTechResults(userAnswers)
                : authService.sendTheoryResults(userAnswers));
            navigate("/results", {
                state: { results: response.data, totalQuestions: questions.length },
            });
        } catch (error) {
            console.error("Failed to send test results:", error);
        }
    };

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers.find(
        (a) => a.questionId === currentQuestion.questionId
    )?.answer;

    return (
        <div className={css.testContainer}>
            <h2 className={css.title}>
                {testType === "tech" ? "QA technical training" : "Testing theory"}
            </h2>
            <div className={css.questionContainer}>
                <p className={css.questionText}>
                    {currentQuestionIndex + 1}. {currentQuestion.question}
                </p>
                <ul className={css.answerList}>
                    {currentQuestion.answers.map((answer, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestion.questionId}`}
                                    value={answer}
                                    checked={currentAnswer === answer}
                                    onChange={() => handleAnswerChange(answer)}
                                />
                                {answer}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={css.controls}>
                <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={css.button}
                >
                    Попереднє питання
                </button>
                <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className={css.button}
                >
                    Наступне питання
                </button>
            </div>
            <button onClick={handleFinishTest} className={css.finishButton}>
                Завершити тест
            </button>
        </div>
    );
};

export default TestPage;
