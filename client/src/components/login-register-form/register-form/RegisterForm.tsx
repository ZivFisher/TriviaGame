import { Button } from '@mui/material'
import { FC } from 'react'
import '../LoginRegisterForm.scss';

export const RegisterForm: FC = () => {
    return (
        <form className='login-register-form'>
            <label className='label' htmlFor="username">שם משתמש</label>
            <input
                className='input'
                type="text"
                id="username"
                name="username"
            />

            <label className='label' htmlFor="password">סיסמא</label>
            <input
                className='input'
                type="password"
                id="password"
                name="password"
            />

            <label className='label' htmlFor="validate-password">אימות סיסמא</label>
            <input
                className='input'
                type="password"
                id="password"
                name="validate-password"
            />

            <Button
                className='login-register-button'
                variant="contained"
            >
                הרשמה
            </Button>
        </form>
    )
}
