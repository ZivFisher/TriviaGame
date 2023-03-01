import { Answer } from "../../interfaces/PlayQuizInterfaces";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { usePlayQuiz } from "../../contexts/PlayQuizContext";
import { useNavigate } from "react-router-dom";

interface PlayAnswerProps {
    answer: Answer;
    haveImages: boolean;
    answerStyle: string;
    setHighlightCorrect: Dispatch<SetStateAction<boolean>>;
    highlightCorrect: boolean;
}

export const PlayAnswer: React.FC<PlayAnswerProps> = ({ haveImages, answer, answerStyle, highlightCorrect, setHighlightCorrect }) => {
    const navigator = useNavigate();
    const { quiz, setScore, setCorrectAnswers, currentQuestion, setCurrentQuestion } = usePlayQuiz();

    const [isClicked, setIsClicked] = useState<boolean>(false);

    const answers = currentQuestion.answers;
    const correctAnswer = answers.find(answer => answer.isCorrect);

    useEffect(() => {
        setIsClicked(false)
        setHighlightCorrect(false)
    }, [currentQuestion])

    const onClick = () => {
        setIsClicked(true)
        checkAnswer(answer.answerId);
    }

    const checkAnswer = (clickedAnswerId: number): void => {
        if (clickedAnswerId === correctAnswer?.answerId) {
            setScore(prev => prev + 25);
            setCorrectAnswers(prev => prev + 1);
        }
        setHighlightCorrect(true);
        setTimeout(() => {
            if (quiz.questions.length !== quiz.questions.indexOf(currentQuestion) + 1) {
                setCurrentQuestion(prev => {
                    let prevIndex: number = quiz.questions.findIndex(question => question.questionId === prev.questionId);
                    return quiz.questions[prevIndex + 1];
                })
            } else navigator('/play-quiz')
        }, 1000);
    }

    return (
        <div
            className={`${haveImages ? 'play-answer-img' : 'play-answer'} ${isClicked ? answerStyle : ''} ${highlightCorrect && answer.isCorrect ? 'correct-answer' : ''}`}
            onClick={onClick}
        >
            <p className="play-answer-p"><span>{answer.content}</span></p>
            {answer.image ? <img src={answer.image} alt={`Image of ${answer.content}`} /> : null}
        </div>
    );
}

