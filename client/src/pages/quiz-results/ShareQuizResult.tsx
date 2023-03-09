import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ScorePackageInterface } from './ScorePackageInterface';
import { useIsBigScreen } from '../../consts/consts';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import './QuizResults.scss';

export const ShareQuizResult: FC = () => {

    const [searchParams] = useSearchParams();
    const scoreId = searchParams.get('scoreId');
    const navigate = useNavigate();
    const isBigScreen = useIsBigScreen();
    const [scorePackage, setScorePackage] = useState<ScorePackageInterface>();
    const nickname = scorePackage?.nickname;
    const score = scorePackage?.score;
    const quiz = scorePackage?.quiz;
    const quizId = quiz?.id;
    const quizTitle = quiz?.title;

    useEffect(() => {
        getScoreFromServer();
    }, []);

    async function getScoreFromServer() {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/score/getById/${scoreId}`);
            setScorePackage(data);
        } catch (e) {
            console.log(e);
        }
    }

    const playQuiz = () => {
        navigate(`/start-game?id=${quizId}`);
    };

    const navigateToHome = () => {
        navigate('/login');
    };

    return (
        <div className='quiz-results-container top-container' style={{ top: '8vh' }}>
            <img
                className='confetti-animation'
                src="./animation/confetti.gif"
                alt="confetti animatios" />
            {isBigScreen ?
                <>
                    <LinearProgress
                        variant='determinate'
                        value={100} />
                    <div className="content">
                        <img
                            className='dancing-monkey-img'
                            src="./svg/Group878.svg"
                            alt="dancing monkey"
                        />
                        <h1>{nickname} קיבל {score} בחידון {quizTitle}</h1>
                        <Button
                            className='play-btn'
                            variant="contained"
                            onClick={playQuiz}
                        >
                            <img
                                className='logo'
                                src="./svg/IconAwesome-play.svg"
                                alt="play button"
                            />שחק בחידון זה בעצמך!
                        </Button>
                    </div></>
                :
                <>
                    <Dialog
                        className='quiz-results-dialog'
                        open={!isBigScreen}
                    >
                        <img
                            className='dancing-monkey'
                            src="./svg/Group597.svg"
                            alt="dancing monkey" />
                        <DialogContent>
                            {nickname} קיבל {score} בחידון {quizTitle}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                className='play-btn'
                                variant="contained"
                                onClick={playQuiz}
                            >
                                <img
                                    className='logo'
                                    src="./svg/IconAwesome-play.svg"
                                    alt="play button"
                                />
                                שחק בעצמך!
                            </Button>

                            <Button
                                className='home-btn'
                                variant="contained"
                                onClick={navigateToHome}
                            >
                                <img
                                    className='logo'
                                    src="./svg/home.svg"
                                    alt="Home"
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
