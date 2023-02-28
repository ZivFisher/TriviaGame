import { useMediaQuery } from '@mui/material';
import './scoreTitle.scss';

export const ScoreTitle: React.FC = () => {

    const isBigScreen = useMediaQuery('(min-width:600px)');
    return (
        <div className='score-title-container'>
            <p className="score-board-title">לוח תוצאות:</p>
            {isBigScreen && <p className="score-board-quiz-name">מה אתם יודעים על גיאורגיה?</p>}
        </div>
    );
};
