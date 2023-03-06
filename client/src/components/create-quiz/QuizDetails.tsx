
import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { BootstrapTooltip } from '../tool-tip/Tooltip';
import { useQuizDetails } from '../../contexts/quizDetailsContext';
import { UploadImage } from '../upload-image/UploadImage';
import { FileInput, useFiles } from '@hilma/fileshandler-client';
import './QuizDetails.scss';

interface QuizDetailsProps {
    onContinue: () => void;
}

export const QuizDetails: React.FC<QuizDetailsProps> = ({ onContinue }) => {
    const isBigScreen: boolean = useMediaQuery('(min-width:600px)');
    const { quizDetails, setQuizDetails, filesUploader } = useQuizDetails();



    const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizDetails((prevState) => ({
            ...prevState,
            description: event.target.value,
        }));
    }

    const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuizDetails((prevState) => ({
            ...prevState,
            title: event.target.value,
        }));
    }

    const handleImageChange = ({ link, id }: { link: string, id: number }): void => {
        setQuizDetails((prevState) => ({
            ...prevState,
            image: link,
            imageId: id

        }));
    }

    const deleteImg = () => {
        setQuizDetails((prevState) => ({
            ...prevState,
            image: ''
        }));
    }

    return (
        <div className='quiz-name-container'>
            {isBigScreen
                ? quizDetails.image
                    ? <UploadImage imageSrc={quizDetails.image} deleteImg={deleteImg} className='quiz-details-img' />
                    : <label>
                        <div className="upload-image">
                            <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                            <BootstrapTooltip title='הוספת תמונה לחידון'>
                                <img src="/svg/image.svg" alt="upload image" />
                            </BootstrapTooltip>
                        </div>
                    </label>

                : <>
                    <div className='next-page-div'>
                        <button className='continue-edit-question' onClick={onContinue}>המשך</button>
                    </div>
                    <div className='add-photo-continue'>
                        {quizDetails.image
                            ? <UploadImage imageSrc={quizDetails.image} deleteImg={deleteImg} className='quiz-details-img' />
                            :
                            <label>
                                <div className="upload-image">
                                    <FileInput type="image" filesUploader={filesUploader} onChange={handleImageChange} className='upload-image-input' />
                                    <img src="/svg/image.svg" alt="upload image" />
                                    העלאת תמונה
                                </div>
                            </label>
                        }
                    </div>
                </>
            }
            <div>
                {isBigScreen
                    ? <BootstrapTooltip title='שינוי שם'>
                        <input
                            className='details-input name-input'
                            placeholder='חידון ללא כותרת'
                            type="text"
                            onChange={(event) => onChangeTitle(event)}
                            value={quizDetails.title}
                        />
                    </BootstrapTooltip>
                    : <div className='input-div'>
                        <label htmlFor="name-input-phone">
                            שם המשחק
                            <input
                                id='name-input-phone'
                                className='phone-input'
                                type="text"
                                onChange={(event) => onChangeTitle(event)}
                                value={quizDetails.title}
                            />
                        </label>
                    </div>
                }
                {isBigScreen
                    ? <BootstrapTooltip title='שינוי תיאור'>
                        <input
                            type="text"
                            className='details-input description-input'
                            placeholder='תיאור החידון'
                            onChange={(event) => onChangeDescription(event)}
                            value={quizDetails.description}
                        />
                    </BootstrapTooltip>
                    : <div className='input-div'>
                        <label htmlFor="description-input-phone">תיאור</label>
                        <input
                            type="text"
                            id='description-input-phone'
                            className='phone-input'
                            onChange={(event) => onChangeDescription(event)}
                            value={quizDetails.description}
                        />
                    </div>
                }
            </div>
        </div>
    );
}