import { useMediaQuery } from '@mui/material';
import { FC } from 'react';
import { useIsBigScreen } from '../../consts/consts';
import './LoginRegisterTitles.scss'


export const LoginRegisterTitles: FC = () => {
    return (
        <div className='register-login-titles'>
            <h1 className='login-register-h1'>{useIsBigScreen() ? "חידונים מטורפים" : "משחק"}</h1>
            <h2 className='login-register-h2'>{useIsBigScreen() ? "בחנו את החברים שלכם בטריוויה שאתם יצרתם!" : "טריוויה"}</h2>
        </div>
    )
}
