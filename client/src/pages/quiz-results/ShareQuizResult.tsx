import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsBigScreen } from '../../consts/consts';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import './QuizResults.scss';


interface ScorePackage {
    id: number;
    nickname: string;
    score: number;
    date: Date;
    quiz: {
        id: string;
        title: string;
        description: string;
        image: string;
    };
}

export const ShareQuizResult: FC = () => {
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const scoreId = searchParams.get('scoreId');
    const navigate = useNavigate();
    const isBigScreen = useIsBigScreen();
    const [scorePackage, setScorePackage] = useState<ScorePackage>();
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
            const { data } = await axios.get(`http://localhost:8080/api/score/${scoreId}`);
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
        <div className='quiz-results-container'>

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
                            className='share-btn'
                            variant="contained"
                            onClick={playQuiz}
                        >
                            <img
                                className='share-logo'
                                src="./svg/Icon-awesome-share.svg"
                                alt="share button"
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
                                className='share-btn'
                                variant="contained"
                                onClick={playQuiz}
                            >
                                <img
                                    className='share-logo'
                                    src="./svg/IconAwesome-play.svg"
                                    alt="share button"
                                />
                                שחק בעצמך!
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
