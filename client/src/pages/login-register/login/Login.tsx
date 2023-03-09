import React, { FC } from 'react';
import { LoginForm } from '../../../components/login-register-form/login-form/LoginForm';
import { LoginRegisterTitles } from '../../../components/login-register-titles/LoginRegisterTitles';
import '../LoginRegister.scss';

export const Login: FC = () => {
    return (
        <div className="full-size-container">
            <div className='register-login-container'>
                <div className="right-side">
                    <img className='right-leaf-img' src="./svg/Group565.svg" alt="right leaf" />
                    <LoginRegisterTitles />
                    <LoginForm />
                </div>
                <div className="left-side">
                    <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />
                </div>
            </div>
        </div>
    );
};
