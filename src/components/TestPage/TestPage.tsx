import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { Question, Answer } from "../types/auth";
import css from "./TestPage.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import QuestionCard from "../QuestionCard/QuestionCard"; // Импортируем новый компонент

const TestPage = () => {
    const { testType } = useParams<{ testType: string }>();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setIsLoading(true);
            try {
                const response = await (testType === "tech"
                    ? authService.getTechQuestions()
                    : authService.getTheoryQuestions());
                setQuestions(response.data);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestions();
    }, [testType]);

    const handleAnswerChange = (answer: string) => {
        const newAnswer: Answer = {
            questionId: questions[currentQuestionIndex].questionId,
            answer,
        };
        const existingAnswerIndex = userAnswers.findIndex(
            (a) => a.questionId === newAnswer.questionId
        );
        const updatedAnswers = [...userAnswers];
        if (existingAnswerIndex > -1) {
            updatedAnswers[existingAnswerIndex] = newAnswer;
        } else {
            updatedAnswers.push(newAnswer);
        }
        setUserAnswers(updatedAnswers);
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

    const finishAndGoToResults = async () => {
        try {
            const response = await (testType === "tech"
                ? authService.sendTechResults(userAnswers)
                : authService.sendTheoryResults(userAnswers));
            navigate("/results", {
                state: {
                    results: response.data,
                    totalQuestions: questions.length,
                    taskName:
                        testType === "tech"
                            ? "QA technical training"
                            : "Testing theory",
                },
            });
        } catch (error) {
            console.error("Failed to send test results:", error);
        }
    };

    const handleFinishTestEarly = () => {
        // Просто перенаправляем на главную страницу без отправки результатов
        navigate("/");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (questions.length === 0) {
        return <div>No questions available for this test.</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers.find(
        (a) => a.questionId === currentQuestion.questionId
    )?.answer;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className={css.testContainer}>
            <div className={css.header}>
                <h2 className={css.title}>
                    [
                    {testType === "tech"
                        ? "QA technical training"
                        : "Testing theory"}
                    _]
                </h2>
                <button
                    onClick={handleFinishTestEarly}
                    className={css.finishButton}
                >
                    Finish test
                </button>
            </div>

            <QuestionCard
                questionData={currentQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                userAnswer={currentAnswer}
                onAnswerChange={handleAnswerChange}
            />

            <div className={css.controls}>
                <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`${css.button} ${css.prevButton}`}
                >
                    <GoArrowLeft size={20} />
                    Previous question
                </button>
                <button
                    onClick={
                        isLastQuestion
                            ? finishAndGoToResults
                            : handleNextQuestion
                    }
                    className={`${css.button} ${css.nextButton}`}
                >
                    {isLastQuestion ? "Finish Test" : "Next question"}
                    {!isLastQuestion && <GoArrowRight size={20} />}
                </button>
            </div>
        </div>
    );
};

export default TestPage;
