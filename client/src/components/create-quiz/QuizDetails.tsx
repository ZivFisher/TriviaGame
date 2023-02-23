import { stringify } from 'querystring';
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './QuizDetails.scss';

export const QuizDetails: React.FC = () => {
    const isBigScreen: boolean = useMediaQuery('(min-width:600px)');
    const [quizDescription, setQuizDescription] = useState<string>('תיאור חידון');
    const [quizName, setQuizName] = useState<string>('חידון ללא כותרת');

    useEffect(() => {
        if (!isBigScreen) {
            setQuizDescription('');
            setQuizName('');
        }
    }, [isBigScreen])

    return (
        <div className='quiz-name-container'>
            {isBigScreen
                ? <div className="upload-image"><img src="/svg/image.svg" alt="upload image" /></div>
                : <div className="upload-image"><img src="/svg/image.svg" alt="upload image" />העלאת תמונה</div>
            }
            <div>
                {isBigScreen
                    ? <input
                        className='details-input name-input'
                        placeholder='שם החידון'
                        type="text"
                        onClick={() => setQuizName('')}
                        value={quizName}
                    />
                    : <div className='input-div'>
                        <label htmlFor="name-input-phone">
                            שם המשחק
                            <input
                                id='name-input-phone'
                                className='name-input-phone'
                                type="text"
                                onClick={() => setQuizName('')}
                                value={quizName}
                            />
                        </label>
                    </div>
                }
                {isBigScreen
                    ? <input
                        className='details-input description-input'
                        type="text"
                        placeholder='תיאור החידון'
                        onClick={() => setQuizDescription('')}
                        value={quizDescription}
                    />
                    : <div className='input-div'>
                        <label htmlFor="description-input-phone">תיאור</label>
                        <input
                            type="text"
                            id='description-input-phone'
                            className='description-input-phone'
                            onClick={() => setQuizDescription('')}
                            value={quizDescription}
                        />
                    </div>
                }
            </div>
        </div>
    );
}