import { HighScoreTable } from '../../components/HighScoreTable/HighScoreTable';
import { ScoreTitle } from '../../components/score-title/ScoreTitle';
import './scorePage.scss';

export const ScorePage: React.FC = () => {
    return (
        <>
            <div className='score-page-container'>
                <ScoreTitle />
                <HighScoreTable />

                <img className='score-page-monkey'
                    src="../svg/winnerMonkey.svg" alt="winner monkey" />

            </div>
        </>
    );
}

