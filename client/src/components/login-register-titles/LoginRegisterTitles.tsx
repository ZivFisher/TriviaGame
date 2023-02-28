import { useMediaQuery } from '@mui/material';
import { FC } from 'react';
import './LoginRegisterTitles.scss'


export const LoginRegisterTitles: FC = () => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');


    return (
        <div className='register-login-titles'>
            <h1 className='login-register-h1'>{isSmallScreen ? "משחק" : "חידונים מטורפים"}</h1>
            <h2 className='login-register-h2'>{isSmallScreen ? "טריוויה" : "בחרנו את החברים שלכם בטריוויה שאתם יצרתם!"}</h2>
        </div>
    )
}
