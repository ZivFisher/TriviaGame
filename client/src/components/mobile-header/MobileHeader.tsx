import React from 'react';
import './MobileHeader.scss';

interface MyProps {
    title: string;
    showLogo: boolean;
}

export const MobileHeader: React.FC<MyProps> = ({ title, showLogo }) => {
    return (
        <header className='generic-mobile-header'>
            <img src="./svg/back.svg" alt="go back" />
            <h1>{title}</h1>
            {showLogo ?
                <img
                    src="./svg/monkey-with-laptop.svg"
                    alt="monkey with laptop"
                /> :
                <div className='empty-div' />}
        </header>
    )
}
