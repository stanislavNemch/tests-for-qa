import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import type { Question, Answer } from "../types/auth";
import css from "./TestPage.module.css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import QuestionCard from "../QuestionCard/QuestionCard";
import toast from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { safeParseJSON } from "../utils/json";

// Определяем структуру нашей сессии в localStorage
interface TestSession {
    questions: Question[];
    userAnswers: Answer[];
}

const TestPage = () => {
    const { testType } = useParams<{ testType: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Ключ для хранения сессии стал более говорящим
    const storageKey = `testSession-${user?.id}-${testType}`;

    useEffect(() => {
        const loadTest = async () => {
            setIsLoading(true);
            const savedSessionJSON = localStorage.getItem(storageKey);

            if (savedSessionJSON) {
                // Сценарий 1: Сессия найдена в localStorage
                const savedSession = safeParseJSON<TestSession>(
                    savedSessionJSON,
                    {
                        questions: [],
                        userAnswers: [],
                    }
                );
                setQuestions(savedSession.questions);
                setUserAnswers(savedSession.userAnswers);
                toast.success("Your previous test progress has been restored.");
            } else {
                // Сценарий 2: Сессии нет, начинаем новый тест
                await fetchAndStartNewTest();
            }
            setIsLoading(false);
        };

        const fetchAndStartNewTest = async () => {
            try {
                const response = await (testType === "tech"
                    ? authService.getTechQuestions()
                    : authService.getTheoryQuestions());

                const newQuestions = response.data;
                const newSession: TestSession = {
                    questions: newQuestions,
                    userAnswers: [],
                };

                setQuestions(newQuestions);
                setUserAnswers([]); // Начинаем с пустыми ответами
                localStorage.setItem(storageKey, JSON.stringify(newSession));
            } catch {
                toast.error("Failed to fetch questions. Please try again.");
                // Если не удалось загрузить вопросы, оставляем массив пустым
                setQuestions([]);
            }
        };

        loadTest();
    }, [storageKey, testType]); // Убрали зависимость от testType, чтобы не перезапускать тест при каждом рендере

    const handleAnswerChange = (answer: string) => {
        const newAnswer: Answer = {
            questionId: questions[currentQuestionIndex].questionId,
            answer,
        };

        let updatedAnswers;
        const existingAnswerIndex = userAnswers.findIndex(
            (a) => a.questionId === newAnswer.questionId
        );

        if (existingAnswerIndex > -1) {
            updatedAnswers = [...userAnswers];
            updatedAnswers[existingAnswerIndex] = newAnswer;
        } else {
            updatedAnswers = [...userAnswers, newAnswer];
        }

        setUserAnswers(updatedAnswers);

        // Обновляем сессию в localStorage при каждом ответе
        const updatedSession: TestSession = {
            questions,
            userAnswers: updatedAnswers,
        };
        localStorage.setItem(storageKey, JSON.stringify(updatedSession));
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
            localStorage.removeItem(storageKey); // Очищаем хранилище

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
        toast("Your progress is saved. Returning to the main page.");
        navigate("/");
    };

    if (isLoading) {
        return <div className={css.loading}>Loading test...</div>;
    }

    if (!questions || questions.length === 0) {
        return (
            <div className={css.noQuestions}>
                Could not load questions for this test.
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const currentAnswer = userAnswers.find(
        (a) => a.questionId === currentQuestion.questionId
    )?.answer;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <section className="test">
            <div className={css.container}>
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
                        Exit test
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
                        <GoArrowLeft size={24} />
                        <span className={css.buttonText}>
                            Previous question
                        </span>
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
                        <GoArrowRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TestPage;
