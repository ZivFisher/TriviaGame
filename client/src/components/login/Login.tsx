import { Button } from '@mui/material';
import React, { FC } from 'react'
import './Login.scss';

export const Login: FC = () => {
    return (
        <div className='login-container'>
            <div className="right-side">
                <h1>חידונים מטורפים</h1>
                <h2>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</h2>

                <form>
                    <label htmlFor="username">שם משתמש
                        <br />
                        <input
                            type="text"
                            id="username"
                            name="username"
                        // value={username}
                        // onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label htmlFor="password">סיסמא
                        <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                        // value={password}
                        // onChange={handleChange}
                        />
                    </label>
                    <br />
                    <Button
                        variant="contained"
                    >
                        כניסה
                    </Button>
                </form>
            </div>
            <div className="left-side"></div>
        </div>
    )
}
