import { FC } from 'react';
import { RegisterForm } from '../../../components/login-register-form/register-form/RegisterForm';
import { LoginRegisterTitles } from '../../../components/login-register-titles/LoginRegisterTitles';
import { useIsBigScreen } from '../../../consts/consts';
import '../LoginRegister.scss';

export const Register: FC = () => {
    return (
        <div className="full-size-container">
            {!useIsBigScreen() && <img className='right-leaf-img' src="./svg/Group565.svg" alt="right leaf" />}
            <div className='register-login-container'>
                <div className="right-side">
                    <LoginRegisterTitles />
                    <RegisterForm />
                </div>
                <div className="left-side">
                    {useIsBigScreen() && <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />}
                </div>
            </div>
            {!useIsBigScreen() && <img className='register-login-img' src="./svg/banana-monkey.svg" alt="monkey hugs banana" />}
        </div>
    );
};
