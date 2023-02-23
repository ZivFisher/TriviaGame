import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import useMediaQuery from '@mui/material/useMediaQuery';
import './HomePageContent.scss';

export const HomePageContent: React.FC = () => {
    const phoneMedia: boolean = useMediaQuery('(max-width:600px)');


    return (
        <>
            <p id="logout">
                <img src="logout.svg" />
                <span>יציאה</span>
            </p>
            <div id="homePageInterface">
                <h1 id="homePageHeader">{phoneMedia ?'משחק טריוויה':'חידונים מטורפים'}</h1>
                {!phoneMedia && <p>בחנו את החברים שלכם בטריוויה שאתם יצרתם!</p>}
                <p id="greeting">שלום, user context</p>
                <div id="homePageButtons">
                    <Button id="createButton" variant="contained">
                        <img src="svg/magic-wand.svg" />
                        <span>צור חידון חדש</span>
                    </Button>
                    <Button id="myQuizesButton" variant="contained">החידונים שלי</Button>
                </div>
            </div>
            <img id='banana-monkey' src="svg/banana-monkey.svg" />
            {phoneMedia&&<img id="leaves-top-right" src="svg/leaves-top-right.svg"/>}
        </>
    );
}

