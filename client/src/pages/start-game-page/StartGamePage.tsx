import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import { usePlayQuiz } from '../../contexts/PlayQuizContext';
import './StartGamePage.scss';

export const StartGamePage: React.FC = () => {
    const isBigScreen = useMediaQuery('(min-width: 600px)');
    const navigate = useNavigate();
    const { quiz } = usePlayQuiz();

    const startGame = () => {
        navigate('/quiz-nickname')
    }

    return (
        <div className='start-game-page-div'>
            <div className="start-game-container">
                {!isBigScreen &&
                    <div className="header-logo">
                        <h3 className="header-title">BANANAS.Games</h3>
                        <img src="./svg/Layer32.svg" alt="BANANAS.Games" />
                    </div>
                }
                <h1>{quiz.title}</h1>
                {!isBigScreen &&
                    <h2>{quiz.description}</h2>
                }
                <img
                    src={quiz.image}
                    alt="quiz photo"
                    className='quiz-image' />
                <button
                    onClick={startGame}
                    className='start-game-btn'>התחילו לשחק
                    <img
                        src="/svg/IconAwesome-play.svg"
                        alt=" start play" />
                </button>
            </div>
            {!isBigScreen &&
                <img
                    src="svg/bottom-left-leaf.svg"
                    alt="banana leaf"
                    className='banana-leaf-left' />
            }
        </div>
    )
}