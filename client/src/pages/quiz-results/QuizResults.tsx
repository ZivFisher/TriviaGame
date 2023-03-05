import { Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { FC, useState } from 'react';
import './QuizResults.scss';

export const QuizResults: FC = () => {
    const isBigScreen: boolean = useMediaQuery('(min-width:401px)');
    const [open, setOpen] = useState(true);

    //This is only temporary variables until we can use context provider.
    const score: number = 50;
    const correctAnswers: number = 2;
    const questions: number = 4;

    //This will be required when we develop the logic.
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className='quiz-results-container'>
            <img className='confetti-animation' src="./animation/confetti.gif" alt="confetti animatios" />
            {isBigScreen ?
                <>
                    <div className="content">
                        <img
                            className='dancing-monkey-img'
                            src="./svg/Group878.svg"
                            alt="dancing monkey"
                        />
                        <h1>ענית נכון על {correctAnswers} שאלות. ציונך: {score}</h1>
                        <p
                            className='share-description-par'>
                            שתף את התוצאה שלך עם חברים ואתגר גם אותם במבחן!
                        </p>
                        <Button
                            className='share-btn'
                            variant="contained"
                        >
                            <img
                                className='share-logo'
                                src="./svg/Icon-awesome-share.svg"
                                alt=""
                            />שתף תוצאה
                        </Button>
                    </div></>
                :
                <>
                    <Dialog
                        className='quiz-results-dialog'
                        open={open && !isBigScreen}
                        onClose={handleClose}
                    >
                        <img className='dancing-monkey' src="./svg/Group597.svg" alt="dancing monkey" />
                        <DialogTitle>הצלחת {correctAnswers} מתוך {questions}</DialogTitle>
                        <DialogContent>
                            ציונך: {score}
                        </DialogContent>
                        <DialogActions>

                            <Button
                                className='share-btn'
                                variant="contained"
                                onClick={handleClose}
                            >
                                <img
                                    className='share-logo'
                                    src="./svg/Icon-awesome-share.svg"
                                    alt=""
                                />
                                שתף תוצאה
                            </Button>

                            <Button
                                className='home-btn'
                                variant="contained"
                                onClick={handleClose}
                            >
                                <img
                                    className='share-logo'
                                    src="./svg/home.svg"
                                    alt=""
                                />
                                עמוד הבית
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            }
        </div>
    );
};
