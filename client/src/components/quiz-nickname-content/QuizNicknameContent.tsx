import '../../pages/quiz-nickname/QuizNickname.scss';
import { Button, useMediaQuery } from '@mui/material';
import React, { useState } from 'react';

export function QuizNicknameContent() {
    const phoneMedia: boolean = useMediaQuery('(max-width:600px)');
    const [nickname, setNickname] = useState<string>('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value: string = e.target.value;
        setNickname(value);
    }

    return (
        <div id='QuizNicknameContainer'>
            {!phoneMedia&&<h1 id='quizNicknameHeader'>איטליה מה אתם יודעים?</h1>}
            <div>
                <label id='nicknameLabel'>איך קוראים לכם?</label>
                <input
                    id='nicknameInput'
                    placeholder='נא להזין שם'
                    name='nickname'
                    onChange={onChange}
                />
                <Button id='quizNicknameButton' variant='contained'>
                    <span>יאללה בואו נתחיל!</span>
                    <img src='IconAwesome-play.svg' />
                </Button>
            </div>
            {phoneMedia&&<img id='group565bottom-left' src='svg/Group565bottom-left.svg'/>}
        </div >
    );
}

