import type { Question } from "../types/auth";
import css from "./QuestionCard.module.css";

interface QuestionCardProps {
    questionData: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    userAnswer: string | undefined;
    onAnswerChange: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    questionData,
    currentQuestionIndex,
    totalQuestions,
    userAnswer,
    onAnswerChange,
}) => {
    return (
        <div className={css.questionBox}>
            <p className={css.questionCounter}>
                Question{" "}
                <span className={css.currentQuestion}>
                    {currentQuestionIndex + 1}
                </span>
                <span className={css.totalQuestions}> / {totalQuestions}</span>
            </p>
            <p className={css.questionText}>{questionData.question}</p>

            <div className={css.divider}></div>

            <ul className={css.answerList}>
                {questionData.answers.map((answer, index) => (
                    <li key={index} className={css.answerItem}>
                        <label className={css.label}>
                            <input
                                type="radio"
                                name={`question-${questionData.questionId}`}
                                value={answer}
                                checked={userAnswer === answer}
                                onChange={() => onAnswerChange(answer)}
                                className={css.radioInput}
                            />
                            <span className={css.customRadio}></span>
                            {answer}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionCard;
