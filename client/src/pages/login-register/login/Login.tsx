import React, { FC } from 'react';
import { LoginForm } from '../../../components/login-register-form/login-form/LoginForm';
import { LoginRegisterTitles } from '../../../components/login-register-titles/LoginRegisterTitles';
import { useIsBigScreen } from '../../../consts/consts';
import '../LoginRegister.scss';

export const Login: FC = () => {
    return (
        <div className="full-size-container">
            {!useIsBigScreen() && <img className='right-leaf-img' src="./svg/Group565.svg" alt="right leaf" />}

            <div className='register-login-container'>
                <div className="right-side">
                    <LoginRegisterTitles />
                    <LoginForm />
                </div>
                <div className="left-side">
                    {useIsBigScreen() && <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />}
                </div>
            </div>
            {!useIsBigScreen() && <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />}
        </div>
    );
};
