import React from 'react';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import './PlayQuizComponents.scss';

export const QuestionIndicator: React.FC = () => {
    const { quiz, currentQuestion } = usePlayQuiz();

    let questionIndex = quiz.questions.findIndex(question => question.questionId === currentQuestion.questionId)

    return (
        <div className='question-indicator'>
            <p className='question-indicator-p'>{" שאלה" + ` ${questionIndex + 1}/${quiz.questions.length}`}</p>
        </div>
    );
}

