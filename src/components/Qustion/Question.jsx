import QuestionTimer from "../QuestionTimer/QuestionTimer";
import Answers from "../Answers/Answer";

export default function Question({ questionText, answers, onSelectAnswer }) {
    return (
        <div id="question">
            <QuestionTimer timeout={5000} onTimeout={handleSkipAnswer} key={activeQuestionIndex} />
            <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
            <Answers
                key={activeQuestionIndex}
                answers={QUESTIONS[activeQuestionIndex].answers}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}