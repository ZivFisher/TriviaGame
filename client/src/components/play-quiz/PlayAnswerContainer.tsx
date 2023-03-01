import React, { useEffect, useState } from 'react';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import { PlayAnswer } from './PlayAnswer';
import './PlayQuizComponents.scss';

export const PlayAnswerContainer: React.FC = () => {
    const { currentQuestion } = usePlayQuiz();

    const [highlightCorrect, setHighlightCorrect] = useState<boolean>(false);
    const [haveImages, setHaveImages] = useState<boolean>(false);


    const { answers } = currentQuestion;

    useEffect(() => {
        if (answers.some(answer => answer.image)) setHaveImages(true);
        else setHaveImages(false);
    }, [currentQuestion])

    return (
        <div className={haveImages ? 'play-answer-container-img' : 'play-answer-container'}>
            {answers.map(answer => {
                return (
                    <PlayAnswer
                        key={answer.answerId}
                        answer={answer}
                        answerStyle={answer.isCorrect ? 'correct-answer' : 'wrong-answer'}
                        haveImages={haveImages}
                        highlightCorrect={highlightCorrect}
                        setHighlightCorrect={setHighlightCorrect}
                    />
                )
            })}
        </div>
    );
}

