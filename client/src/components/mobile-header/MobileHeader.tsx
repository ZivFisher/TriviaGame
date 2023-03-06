import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MobileHeader.scss';

interface MyProps {
    title: string;
    showLogo: boolean;
}

export const MobileHeader: React.FC<MyProps> = ({ title, showLogo }) => {

    const navigate = useNavigate()

    const handleNavigateBack = () => navigate(-1)
    const handleNavigateHome = () => navigate('/home-page')

    return (
        <header className='generic-mobile-header'>
            <img onClick={handleNavigateBack} src="./svg/back.svg" alt="go back" />
            <h1>{title}</h1>
            {showLogo ?
                <img
                    onClick={handleNavigateHome}
                    src="./svg/monkey-with-laptop.svg"
                    alt="monkey with laptop"
                /> :
                <div className='empty-div' />}
        </header>
    )
}
