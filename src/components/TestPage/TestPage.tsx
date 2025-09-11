import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { Question, Answer } from "../types/auth";
import css from "./TestPage.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import QuestionCard from "../QuestionCard/QuestionCard";
import toast from "react-hot-toast"; // Используем react-hot-toast

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
            } catch {
                toast.error("Failed to fetch questions. Please try again.");
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
        if (userAnswers.length < questions.length) {
            // Используем кастомный toast для предупреждения
            toast("Please answer all questions before finishing the test.", {
                icon: "⚠️",
            });
            return;
        }

        try {
            const response = await (testType === "tech"
                ? authService.sendTechResults(userAnswers)
                : authService.sendTheoryResults(userAnswers));
            toast.success("Test completed successfully!");
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
        } catch {
            toast.error("Failed to send test results. Please try again.");
        }
    };

    const handleFinishTestEarly = () => {
        // Простое уведомление
        toast("Test interrupted, returning to the main page.");
        navigate("/");
    };

    if (isLoading) {
        return <div className={css.loading}>Loading questions...</div>;
    }

    if (questions.length === 0) {
        return (
            <div className={css.noQuestions}>
                No questions available for this test.
            </div>
        );
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
                    <span className={css.buttonText}>Previous question</span>
                </button>
                <button
                    onClick={
                        isLastQuestion
                            ? finishAndGoToResults
                            : handleNextQuestion
                    }
                    className={
                        isLastQuestion
                            ? `${css.button} ${css.finishButton}`
                            : `${css.button} ${css.nextButton}`
                    }
                >
                    <span className={css.buttonText}>
                        {isLastQuestion ? "Finish Test" : "Next question"}
                    </span>
                    <GoArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default TestPage;
