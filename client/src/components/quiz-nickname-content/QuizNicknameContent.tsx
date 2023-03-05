import '../../pages/quiz-nickname/QuizNickname.scss';
import { Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import { MobileHeader } from '../mobile-header/MobileHeader';

export function QuizNicknameContent() {
    const phoneMedia: boolean = useMediaQuery('(max-width:600px)');
    const [nickname, setNickname] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;
        setNickname(value);
    }

    return (
        <div className='quiz-nickname-container'>
            {!phoneMedia
                ? <h1 className='quiz-nickname-header'>איטליה מה אתם יודעים?</h1>
                : <MobileHeader title='איטליה מה אתם יודעים?' showLogo={false} />
            }
            <div className='quiz-nickname-content'>
                <label className='nickname-label'>איך קוראים לכם?</label>
                <input
                    className='nickname-input'
                    placeholder='נא להזין שם'
                    name='nickname'
                    onChange={onChange}
                />
                <Button className='quiz-nickname-button' variant='contained'>
                    <span>יאללה בואו נתחיל!</span>
                    <img src='svg/IconAwesome-play.svg' />
                </Button>
            </div>
            {phoneMedia && <img className='photo-bottom-left' src='svg/Group565bottom-left.svg' />}
        </div>
    );
}

