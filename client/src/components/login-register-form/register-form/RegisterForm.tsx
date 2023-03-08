import { Button } from '@mui/material'
import axios from 'axios';
import { FC, useState } from 'react'
import '../LoginRegisterForm.scss';

export const RegisterForm: FC = () => {

    const [registerForm, setRegisterForm] = useState<{
        username: string,
        password: string
    }>({
        username: '',
        password: ''
    })

    const [validatePassword, setValidatePassword] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // if (e.target.name === "validate-password") {
        //     setValidatePassword(e.target.value);
        // }
        // else {
        setRegisterForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
        // }
    }

    const passwordValidated = () => validatePassword === registerForm.password;


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // if (passwordValidated()) {
        try {
            const { data } = await axios.post("/auth/register", registerForm);
            alert("You are registered, " + JSON.stringify(data, null, 2));
        } catch (error) {
            alert(JSON.stringify(error, null, 2));
        }
        // } else {
        // console.log("passwords are diffrent")
        // }
    }

    return (
        <form className='login-register-form' onSubmit={(e) => { handleSubmit(e) }}>
            <label className='label' htmlFor="username">שם משתמש</label>
            <input
                className='input'
                type="text"
                id="username"
                name="username"
                value={registerForm.username}
                onChange={handleChange}
            />

            <label className='label' htmlFor="password">סיסמא</label>
            <input
                className='input'
                type="password"
                id="password"
                name="password"
                value={registerForm.password}
                onChange={handleChange}
            />

            <label className='label' htmlFor="validate-password">אימות סיסמא</label>
            <input
                className='input'
                type="password"
                id="validate-password"
                name="validate-password"
                onChange={handleChange}
                value={validatePassword}
            />

            <Button
                className='login-register-button'
                variant="contained"
                type='submit'
            >
                הרשמה
            </Button>
        </form>
    )
}
