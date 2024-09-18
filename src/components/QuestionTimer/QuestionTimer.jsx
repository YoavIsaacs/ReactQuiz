import { useState, useEffect } from "react";


export default function QuestionTimer({ timeout, onTimeout }) {

    const [remainingTime, setRemainingTime] = useState(timeout);



    useEffect(() => {
        const timeoutFunc = setTimeout(onTimeout, timeout);

        return () => clearTimeout(timeoutFunc);
    }, [timeout, onTimeout]);

    useEffect(() => {
        const intervalFunc = setInterval(() => {
            setRemainingTime((prev) =>  Math.max(prev - 100 ));
        }, 100);

        return () => clearInterval(intervalFunc);
    }, [timeout]);




    return (
        <>
            <progress id="question-time" max={timeout} value={remainingTime} />
            {console.log(remainingTime)}
        </>
    );
}