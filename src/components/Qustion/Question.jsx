import QuestionTimer from "../QuestionTimer/QuestionTimer";
import Answers from "../Answers/Answer";
import QUESTIONS from "../../questions.js";
import { useState } from "react";

export default function Question({ onSelectAnswer, onSkipAnswer, key }) {


    const [answer, setAnswer] = useState({
        selectedAnswer: "",
        isCorrect: null
    });

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[key].answers[0] === answer
            });
        }, 1000);

        setTimeout(() => {
            onSelectAnswer(answer);
        }, 2000);
        
    }

    let answerState = "";

    if (answer.selectedAnswer) {
        answerState = answer.isCorrect ? "correct" : "wrong";
    }

    return (
        <div id="question">
            <QuestionTimer timeout={5000} onTimeout={onSkipAnswer} />
            <h2>{QUESTIONS[key].text}</h2>
            <Answers
                answers={QUESTIONS[key].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={onSelectAnswer}
            />
        </div>
    );
}