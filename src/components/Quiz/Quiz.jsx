import { useState, useCallback } from "react";
import QUESTIONS from '../../questions.js'
import quizCompleteImg from '../../assets/quiz-complete.png'
import QuestionTimer from "../QuestionTimer/QuestionTimer.jsx";

export default function Quiz() {

    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnsweredState]  = useState("");

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

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);




    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={5000} onTimeout={handleSkipAnswer} key={activeQuestionIndex} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => { 
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;
                        let cssClass = "";

                        if (isSelected && answerState === "answered") {
                            cssClass = "selected";
                        }

                        if ((answerState === "correct" || answerState === "wrong") && isSelected) {
                            cssClass = answerState;
                        }

                        return(
                        <li key={answer} className="answer"><button className={cssClass} onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>
                        );
                    })}
                </ul>
            </div>
        </div>

    );


}

