import { Button } from '@mui/material'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import '../LoginRegisterForm.scss';

export const LoginForm: FC = () => {
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

            <Button
                className='login-register-button'
                variant="contained"
            >
                כניסה
            </Button>
            <p className='register-par'>עוד לא משתמש רשום? <Link to='/register'>הירשם כאן</Link></p>
        </form>
    )
}
