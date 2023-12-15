import React from 'react';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import './PlayQuizComponents.scss';

export const QuestionIndicator: React.FC = () => {

    const { quiz, currentQuestion } = usePlayQuiz();
    console.log('currentQuestion:', currentQuestion, quiz);
    let questionIndex = quiz ? quiz.questions.findIndex(question => question.id === currentQuestion?.id) : -1;
    console.log(questionIndex);

    return (
        <div className='question-indicator'>
            <p className='question-indicator-p'>{` שאלה ${questionIndex + 1}/${quiz?.questions.length}`}</p>
        </div>
    );
}

