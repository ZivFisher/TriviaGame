import { Button } from '@mui/material'
import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@hilma/auth';
import { useUser } from '../../../contexts/UserContext';
import '../LoginRegisterForm.scss';

export const LoginForm: FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [loginForm, setLoginForm] = useState<{ username: string, password: string }>({ username: '', password: '' })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { success, msg, user } = await login('/auth/login', loginForm);
            if (success) {
                setUser({
                    id: user.id,
                    username: user.username,
                    type: user.type,
                    roles: user.roles,
                    roleKeys: user.roleKeys
                })
                console.log(111111111111111)
                navigate('/create-quiz');
            } else {
                console.log("Invalid user information! Please try again ", msg);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form className='login-register-form' onSubmit={(e) => handleSubmit(e)}>
            <label className='label' htmlFor="username">שם משתמש</label>
            <input
                className='input'
                type="text"
                id="username"
                name="username"
                value={loginForm.username}
                onChange={(e) => handleChange(e)}
            />

            <label className='label' htmlFor="password">סיסמא</label>
            <input
                className='input'
                type="password"
                id="password"
                name="password"
                value={loginForm.password}
                onChange={handleChange}
            />

            <Button
                className='login-register-button'
                variant="contained"
                type='submit'
            >
                כניסה
            </Button>
            <p className='register-par'>עוד לא משתמש רשום? <Link to='/register'>הירשם כאן</Link></p>
        </form>
    )
}
