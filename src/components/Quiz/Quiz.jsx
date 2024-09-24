import { useState, useCallback } from "react";
import QUESTIONS from '../../questions.js'
import quizCompleteImg from '../../assets/quiz-complete.png'
import Question from "../Qustion/Question.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnsweredState] = useState("");

    const activeQuestionIndex = answerState === "" ? userAnswers.length : userAnswers.length - 1;
    const finishedAllQuestions = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnsweredState('answered');
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers, selectedAnswer]
            return newAnswers;
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnsweredState("correct");
            } else {
                setAnsweredState("wrong");
            }

            setTimeout(() => {
                setAnsweredState("");
            }, 2000);
        }, 1000)

    }, [activeQuestionIndex])

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (finishedAllQuestions) {
        return (
            <div id="summary">
                <img src={quizCompleteImg} alt="Trophy image" />
                <h2>Quiz completed!</h2>
            </div>
        );
    }




    return (
        <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionText={QUESTIONS[activeQuestionIndex].text}
                answers={QUESTIONS[activeQuestionIndex].answers}
                onSelectAnswer={handleSelectAnswer}
                answerState={answerState}
                selectedAnswer={userAnswers[userAnswers.length - 1]}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    );


}

