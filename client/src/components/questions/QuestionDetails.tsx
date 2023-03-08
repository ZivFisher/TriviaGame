import { useState } from 'react';
import { AnswerDetails } from '../answer-details/AnswerDetails';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Answer } from '../../interfaces/quizDetailInterface';
import { useQuizDetails } from '../../contexts/quizDetailsContext';
import { FileInput, UploadedFile, useFiles } from '@hilma/fileshandler-client'
import { UploadImage } from '../upload-image/UploadImage';
import './QuestionDetails.scss';
import { useIsBigScreen } from '../../consts/consts';


interface QuestionProps {
    questionId: number;
    questionTitle: string;
    index: number;
    copyQuestion: (copyQuestionIndex: number, answers: Answer[]) => void;
    deleteQuestion: (questionId: number) => void;
    onChangeQuestionTitle: (event: string, questionId: number) => void;
}

export const QuestionDetails: React.FC<QuestionProps> = ({ questionId, questionTitle, index, onChangeQuestionTitle, deleteQuestion, copyQuestion }) => {
    const isBigScreen = useIsBigScreen();
    const {
        questions,
        setQuestions,
        deleteAnswer,
        markedAsCorrect,
        changeAnswerContent,
        deleteImg,
        filesUploader
    } = useQuizDetails();
    const [answerId, setAnswersId] = useState<number>(questions[index].answers.length + 1);

    const addAnswer = (questionIndex: number): void => {
        if (questions[questionIndex].answers.length === 4) return;
        setQuestions(prev =>
            prev.map(question =>
                (question.id || question.tempId) === questionId ?
                    { ...question, answers: [...question.answers, { tempId: answerId, isCorrect: false, content: '' }] } : question))
        setAnswersId(prev => prev + 1);
    };

    const handleImageChange = ({ id, link }: UploadedFile): void => {
        setQuestions(prev =>
            [...prev.map(question => {
                if ((question.id || question.tempId) === questionId) {
                    question.image = link;
                    question.imageId = id;
                }
                return question;
            })]
        );
    };
    return (
        <div className='question-container-div'>
            <div className='question-main-content'>
                {isBigScreen
                    ? <div className='question-details'>
                        <BootstrapTooltip title="החלף סדר שאלות">
                            <img src="/images/drag-and-drop.png" alt="drag and drop" className='drag-and-drop' />
                        </BootstrapTooltip>
                        <BootstrapTooltip title="שינוי שם">
                            <input
                                id='question-content'
                                className='question-content'
                                type="text"
                                placeholder='שאלה ללא כותרת'
                                onClick={() => {
                                    if (questionTitle === 'שאלה ללא כותרת') {
                                        onChangeQuestionTitle('', questionId)
                                    }
                                }}
                                onChange={(event) => onChangeQuestionTitle(event.target.value, questionId)}
                                value={questionTitle}
                            />
                        </BootstrapTooltip>
                        {questions[index].image
                            ?
                            <UploadImage
                                imageSrc={questions[index].image}
                                deleteImg={deleteImg}
                                questionId={questionId}
                            />
                            : <BootstrapTooltip title="הוספת תמונה לשאלה">
                                <label>
                                    <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                                    <img src="/svg/image.svg" alt=" upload image" className='image-photo-details pointer-img' />
                                </label>
                            </BootstrapTooltip>
                        }
                    </div>
                    : <>
                        {index !== 0 &&
                            <p className='border-question'></p>
                        }
                        <div className='question-title'>
                            <p>שאלה {index + 1}</p>
                            <div className='mobile-question-option'>
                                <img
                                    src="/svg/copy.svg"
                                    alt="copy question"
                                    className='mobile-copy pointer-img'
                                    onClick={() => copyQuestion(index, questions[index].answers)}
                                />
                                <img
                                    src="/svg/trash.svg"
                                    alt="delete question"
                                    className='mobile-bin pointer-img'
                                    onClick={() => deleteQuestion(questionId)}
                                />
                            </div>
                        </div>
                        <label htmlFor="mobile-question-content">כותרת</label>
                        <div className='mobile-title-div'>
                            <div className='mobile-title-content'>
                                <input
                                    className='mobile-question-content'
                                    type="text"
                                    value={questionTitle}
                                    onClick={() => {
                                        if (questionTitle === 'שאלה ללא כותרת') {
                                            onChangeQuestionTitle('', questionId)
                                        }
                                    }}
                                    onChange={(event) => onChangeQuestionTitle(event.target.value, questionId)}
                                />
                                <label className={questions[index].image ? 'disabled' : ''}>
                                    <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                                    <img src="/svg/image.svg" alt=" upload image" className='image-photo-details pointer-img' />
                                </label>
                            </div>
                            {questions[index].image
                                ? <UploadImage
                                    imageSrc={questions[index].image}
                                    deleteImg={deleteImg}
                                    questionId={questionId}
                                />
                                : null}
                        </div>
                    </>
                }

                {questions[index].answers.map((answer, answerIndex) => {
                    return <AnswerDetails
                        key={(answer.id || answer.tempId)!}
                        questionIndex={index}
                        answerNum={answerIndex + 1}
                        answerId={(answer.id || answer.tempId)!}
                        onCorrect={markedAsCorrect}
                        answerContent={answer.content}
                        onAnswer={changeAnswerContent}
                        onDeleteAnswer={deleteAnswer}
                        isCorrect={answer.isCorrect}
                        questionId={questionId}
                        answerIndex={answerIndex} />
                })}
                {questions[index].answers.length < 4
                    ? <div className='answer-option' onClick={() => addAnswer(index)}>
                        <img src="/svg/plus.svg" alt="add answer" className='plus-photo' />
                        <p className='add-answer'>הוספת תשובה</p>
                    </div>
                    : null}
                {isBigScreen
                    ? <>
                        <p className='line'></p>
                        <div className='question-option'>
                            <BootstrapTooltip title="שכפול">
                                <img
                                    src="/svg/copy.svg"
                                    alt="copy question"
                                    className='copy pointer-img'
                                    onClick={() => copyQuestion(index, questions[index].answers)}
                                />
                            </BootstrapTooltip>
                            <BootstrapTooltip title="מחיקה">
                                <img
                                    src="/svg/trash.svg"
                                    alt="delete question"
                                    className='delete pointer-img'
                                    onClick={() => deleteQuestion(questionId)} />
                            </BootstrapTooltip>
                        </div>
                        <img
                            src="/svg/monkey-with-laptop.svg"
                            alt="monkey with computer"
                            className='monkey-computer pointer-img' />
                    </>
                    : null
                }
            </div>

        </div>
    );
};