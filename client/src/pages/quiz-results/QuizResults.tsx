import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { usePlayQuiz } from '../../contexts/PlayQuizContext'
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsBigScreen } from '../../consts/consts';
import axios from 'axios'
import './QuizResults.scss';

export const QuizResults: FC = () => {
    const navigate = useNavigate()
    const isBigScreen: boolean = useIsBigScreen()
    const [isOpen, setOpen] = useState(true);

    const { quiz, score, correctAnswers, nickname } = usePlayQuiz();
    const { questions, id } = quiz;

    useEffect(() => {
        sendScoreToServer()
    }, [])

    async function sendScoreToServer() {
        const API_ENDPOINT = 'http://localhost:8080/api/quiz';

        const requestBody = {
            nickname,
            quizId: id,
            score
        };

        try {
            await axios.post(API_ENDPOINT, requestBody);
        } catch (e) {
            console.log(e);
        }
    }

    const handleShare = () => {

    };

    const navigateToHome = () => {
        navigate('/home-page')
    };

    return (
        <div className='quiz-results-container'>

            <img className='confetti-animation' src="./animation/confetti.gif" alt="confetti animatios" />
            {isBigScreen ?
                <>
                    <LinearProgress variant='determinate' value={100} />
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
                                alt="share button"
                            />שתף תוצאה
                        </Button>
                    </div></>
                :
                <>
                    <Dialog
                        className='quiz-results-dialog'
                        open={isOpen && !isBigScreen}
                    >
                        <img className='dancing-monkey' src="./svg/Group597.svg" alt="dancing monkey" />
                        <DialogTitle>הצלחת {correctAnswers} מתוך {questions.length}</DialogTitle>
                        <DialogContent>
                            ציונך: {score}
                        </DialogContent>
                        <DialogActions>

                            <Button
                                className='share-btn'
                                variant="contained"
                                onClick={handleShare}
                            >
                                <img
                                    className='share-logo'
                                    src="./svg/Icon-awesome-share.svg"
                                    alt="share button"
                                />
                                שתף תוצאה
                            </Button>

                            <Button
                                className='home-btn'
                                variant="contained"
                                onClick={navigateToHome}
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
