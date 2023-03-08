import React from 'react';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import './PlayQuizComponents.scss';


export const QuestionTitle: React.FC = () => {

    const { currentQuestion } = usePlayQuiz();

    return (
        <>
            {currentQuestion?.image
                ? <img
                    className='question-img'
                    src={currentQuestion?.image}
                    alt={`${currentQuestion.title}`}
                />
                : null
            }
            <div className='question-title'>
                <p>{currentQuestion?.title}</p>
            </div>
        </>
    );
};
