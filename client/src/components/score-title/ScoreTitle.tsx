import { useScoreBoardContext } from '../../contexts/ScorePageContext';
import { useIsBigScreen } from '../../consts/consts';
import './scoreTitle.scss';

export const ScoreTitle: React.FC = () => {
    const { quizTitle } = useScoreBoardContext();
    const isBigScreen = useIsBigScreen();
    return (
        <div className='score-title-container'>
            <p className="score-board-title">לוח תוצאות:</p>
            {isBigScreen && <p className="score-board-quiz-name">{quizTitle}</p>}
        </div>
    );
};
