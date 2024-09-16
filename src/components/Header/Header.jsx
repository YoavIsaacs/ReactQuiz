import image from '../../assets/quiz-logo.png';

export default function Header() {
    return(
        <header>
            <img src={image} alt='quiz logo'/>
            <h1>ReachQuiz</h1>
        </header>
    );
}