import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from "react-router-dom";

import './HomePageContent.scss';

export const HomePageContent: React.FC = () => {
    const phoneMedia: boolean = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();

    const navigateToCreateQuiz = () => navigate('/create-quiz');

    const navigateToMyQuizzes = () => navigate('/my-quizzes');

    return (
        <>
            <Link
                to={'/login'}
                className="logout"
            >
                <img src="logout.svg" alt="logout" />
                <span>יציאה</span>
            </Link>
            <div className="home-page-interface">
                <h1 className="home-page-header"> {phoneMedia ? 'משחק טריוויה' : 'חידונים מטורפים'} </h1>
                {!phoneMedia && <p>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</p>}
                <p className="greeting">שלום, user context</p>
                <div className="home-page-buttons">
                    <Button
                        className="create-button"
                        variant="contained"
                        onClick={navigateToCreateQuiz}
                    >
                        <img
                            src="svg/magic-wand.svg"
                            alt="magic-wand" />
                        <span>צור חידון חדש</span>
                    </Button>
                    <Button
                        className="my-quizzes-button"
                        variant="contained"
                        onClick={navigateToMyQuizzes}
                    >החידונים שלי
                    </Button>
                </div>
            </div>
            <img
                className='banana-monkey'
                src="svg/banana-monkey.svg"
                alt="monkey with banana"
            />
            {phoneMedia && <img
                className="leaves-top-right"
                src="svg/leaves-top-right.svg"
                alt="banana leaves" />}
        </>
    );
}

