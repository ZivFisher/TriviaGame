import { useMediaQuery } from '@mui/material';
import { HighScoreTable } from '../../components/HighScoreTable/HighScoreTable';
import { MobileHeader } from '../../components/mobile-header/MobileHeader';
import { ScoreTitle } from '../../components/score-title/ScoreTitle';
import './scorePage.scss';

export const ScorePage: React.FC = () => {
    const isBigScreen = useMediaQuery('(min-width: 600px)')
    return (
        <>
            <div className='score-page-container'>
                {!isBigScreen &&
                    <MobileHeader title='החידונים שלי' showLogo={false} />
                }
                <ScoreTitle />
                <HighScoreTable />

                {isBigScreen &&
                    <img className='score-page-monkey'
                        src="../svg/winnerMonkey.svg"
                        alt="winner monkey" />}
            </div>
        </>
    );
}

