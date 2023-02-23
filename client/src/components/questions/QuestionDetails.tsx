
import { useEffect, useState } from 'react';
import { AnswerDetails } from '../answer-details/AnswerDetails';
import { Answer } from '../answer-interface/AnswerType';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import './QuestionDetails.scss';


export const QuestionDetails: React.FC = () => {
    const isBigScreen: boolean = useMediaQuery('(min-width:600px)');
    const [answers, setAnswers] = useState<Answer[]>([
        { id: 1, content: '', isCorrect: false },
        { id: 2, content: '', isCorrect: true }]);
    const [answerId, setAnswersId] = useState<number>(3);
    const [question, setQuestion] = useState<string>('שאלה ללא כותרת');

    useEffect(() => {
        if (!isBigScreen) {
            setQuestion('');
        }
    }, [isBigScreen])

    const addAnswer = (): void => {
        if (answers.length === 4) return;
        setAnswers((prev) => [...prev, { id: answerId, content: '', isCorrect: false }]);
        setAnswersId((prev) => prev + 1);
    }

    const markedAsCorrect = (event: React.ChangeEvent<HTMLInputElement>, answerId: number): void => {
        const tempArr = [...answers];
        tempArr.forEach((item) => {
            if (item.id === answerId) {
                item.isCorrect = event.target.checked;
            }
        })
        setAnswers(tempArr);
    }

    const addAnswerContent = (event: React.ChangeEvent<HTMLInputElement>, answerId: number): void => {
        const tempArr = [...answers];
        tempArr.forEach((item) => {
            if (item.id === answerId) {
                item.content = event.target.value;
            }
        })
        setAnswers(tempArr);
    }

    return (
        <div className='question-container-div'>
            <p className='gray-line'></p>
            <div className='question-main-content'>
                {isBigScreen
                    ? <div>
                        <BootstrapTooltip title="שינוי שם">
                            <input
                                id='question-content'
                                className='question-content'
                                type="text"
                                placeholder='כותרת לשאלה'
                                onClick={() => setQuestion('')}
                                value={question}
                            />
                        </BootstrapTooltip>
                        <BootstrapTooltip title="הוספת תמונה לשאלה">
                            <img src="/svg/image.svg" alt=" upload image" className='image-photo' />
                        </BootstrapTooltip>
                    </div>
                    : <>
                        <div className='question-title'>
                            <p>שאלה 1</p>
                            <div className='mobile-question-option'>
                                <img src="/svg/copy.svg" alt="copy question" className='mobile-copy' />
                                <img src="/svg/garbage.svg" alt="delete question" className='mobile-bin' />
                            </div>
                        </div>
                        <label htmlFor="mobile-question-content">כותרת</label>
                        <div className='mobile-title-div'>
                            <input className='mobile-question-content' type="text" onClick={() => setQuestion('')} value={question} />
                            <img src="/svg/image.svg" alt="upload image" className='image-photo' />
                        </div>
                    </>
                }

                {answers.map((answer) => {
                    return <AnswerDetails answerNum={answer.id} onCorrect={markedAsCorrect} answerContent={answer.content} onAnswer={addAnswerContent} />
                })}
                {answers.length < 4 ? <div className='answer-option' onClick={addAnswer}>
                    <img src="/svg/plus.svg" alt="add answer" className='plus-photo' />
                    <p id='add-answer'>הוספת תשובה</p>
                </div> : null}
                {isBigScreen
                    ? <>
                        <p className='line'></p>
                        <div className='question-option'>
                            <BootstrapTooltip title="שכפול">
                                <img src="/svg/copy.svg" alt="copy question" className='copy' />
                            </BootstrapTooltip>
                            <BootstrapTooltip title="מחיקה">
                                <img src="/svg/garbage.svg" alt="delete question" />
                            </BootstrapTooltip>
                        </div>
                        <img src="/svg/monkey-with-laptop.svg" alt="monkey with computer" className='monkey' />
                    </>
                    : null
                }
            </div>
        </div>
    );
}