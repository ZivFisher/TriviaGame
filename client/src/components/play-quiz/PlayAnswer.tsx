import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Answer } from "../../interfaces/PlayQuizInterfaces";
import { usePlayQuiz } from "../../contexts/PlayQuizContext";

interface PlayAnswerProps {
    answer: Answer;
    haveImages: boolean;
    setHighlightCorrect: Dispatch<SetStateAction<boolean>>;
    highlightCorrect: boolean;
    toggleClick: boolean;
    setToggleClick: Dispatch<SetStateAction<boolean>>;
}

export const PlayAnswer: React.FC<PlayAnswerProps> = ({ haveImages, answer, highlightCorrect, setHighlightCorrect, toggleClick, setToggleClick }) => {

    const navigate = useNavigate();
    const { quiz, sendScoreToServer, setScore, setCorrectAnswers, currentQuestion, setCurrentQuestion } = usePlayQuiz();
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const answers = currentQuestion?.answers;
    const correctAnswer = answers?.find(answer => answer.isCorrect);
    const questionIndex = currentQuestion ? quiz.questions.indexOf(currentQuestion) : -1;
    const answerStyle = answer.isCorrect ? 'correct-answer' : 'wrong-answer';


    useEffect(() => {
        setIsClicked(false);
        setHighlightCorrect(false);
        setToggleClick(false);
    }, [currentQuestion]);

    const onClick = () => {
        setIsClicked(true);
        setToggleClick(true);
        checkAnswer(answer.id);
    };



    const checkAnswer = (clickedAnswerId: number): void => {
        if (clickedAnswerId === correctAnswer?.id) {
            setScore(prev => prev + (1 / quiz.questions.length * 100));
            setCorrectAnswers(prev => prev + 1);
        }
        setHighlightCorrect(true);
        setTimeout(async () => {
            if (quiz.questions.length !== questionIndex + 1) {
                setCurrentQuestion(quiz.questions[questionIndex + 1]);
            } else {
                setScore(prev => Math.round(prev));
                sendScoreToServer((id: number | null) => {
                    if (id) navigate(`/quiz-results?scoreId=${id}`);
                    else navigate(`/quiz-results`);
                });
            }
        }, 1500);
    };

    return (
        <div
            className={`${haveImages ? 'play-answer-img' : 'play-answer'} ${isClicked ? answerStyle : ''} ${highlightCorrect && answer.isCorrect ? 'correct-answer' : ''}`}
            onClick={toggleClick ? () => { } : onClick}
        >
            <p className="play-answer-p"><span>{answer.content}</span></p>
            {answer.image ? <img src={answer.image} alt={`${answer.content}`} /> : null}
        </div>
    );
}

