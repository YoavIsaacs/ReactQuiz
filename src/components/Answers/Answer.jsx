
export default function Answers({ answers, selectedAnswer, answerState }) {
    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = userAnswers[userAnswers.length - 1] === answer;
                let cssClass = "";

                if (isSelected && answerState === "answered") {
                    cssClass = "selected";
                }

                if ((answerState === "correct" || answerState === "wrong") && isSelected) {
                    cssClass = answerState;
                }

                return (
                    <li key={answer} className="answer"><button className={cssClass} onClick={() => handleSelectAnswer(answer)}>{answer}</button></li>
                );
            })}
        </ul>
    );
}