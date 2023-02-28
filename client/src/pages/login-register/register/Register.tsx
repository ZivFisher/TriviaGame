import { FC } from 'react';
import { RegisterForm } from '../../../components/login-register-form/register-form/RegisterForm';
import { LoginRegisterTitles } from '../../../components/login-register-titles/LoginRegisterTitles';
import '../LoginRegister.scss';

export const Register: FC = () => {
    return (
        <div className="full-size-container">
            <div className='register-login-container'>
                <img className='right-leaf-img' src="./svg/Group565.svg" alt="right leaf" />
                <div className="right-side">
                    <LoginRegisterTitles />
                    <RegisterForm />
                </div>
                <div className="left-side">
                    <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />
                </div>
            </div>
        </div>
    );
};
