import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './QuizDetails.scss';

export const QuizDetails: React.FC = () => {
    const isBigScreen = useMediaQuery('(min-width:600px)');
    const [quizDescription, setQuizDescription] = useState<string>('תיאור חידון');
    const [quizName, setQuizName] = useState<string>('חידון ללא כותרת');
    
    useEffect(() => {
       if(!isBigScreen){
        setQuizDescription('');
        setQuizName('');
       } 
    },[isBigScreen])

    return (
        <div className='quiz-name-container'>
             <div className="add-quiz-image"><img src="/svg/image.svg" alt="image" />{isBigScreen? '' : 'העלאת תמונה'}</div> 
            <div>
                {isBigScreen ? <input className='quiz-details-input' id='quiz-name-input' placeholder='שם החידון' type="text" onClick={() => setQuizName('')} value={quizName} /> 
                : <div className='quiz-input-div'><label htmlFor="quiz-name-input-phone">שם המשחק<input id='quiz-name-input-phone' type="text" onClick={() => setQuizName('')} value={quizName} /></label></div>}
                {isBigScreen ? <input className='quiz-details-input' type="text" placeholder='תיאור החידון' id='quiz-description-input' onClick={() => setQuizDescription('')} value={quizDescription} />
                : <div className='quiz-input-div'><label htmlFor="quiz-description-input-phone">תיאור</label><input type="text" id='quiz-description-input-phone' onClick={() => setQuizDescription('')} value={quizDescription} /></div>}
            </div>
            
        </div>
    );
}