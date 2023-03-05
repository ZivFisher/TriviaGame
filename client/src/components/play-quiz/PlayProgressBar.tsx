import { useEffect, useState } from "react"
import { LinearProgress } from '@mui/material';
import { usePlayQuiz } from "../../contexts/PlayQuizContext";
import '../../pages/play-quiz-page/PlayQuizPage.scss';

export const PlayProgressBar = () => {
    const [progress, setProgress] = useState<number>(0);
    const { quiz, currentQuestion } = usePlayQuiz();
    const [currentIndex, setCurrentIndex] = useState<number>(1);
    
    const numOfQuestions: number = quiz.questions.length;

    useEffect(() => {
        setCurrentIndex(prev => prev + 1);
        setProgress(currentIndex / (numOfQuestions) * 100);
    }, [currentQuestion])

    return (
        <LinearProgress className="play-progress-bar" variant="determinate" value={progress} />
    );
}