import { useEffect } from 'react';
import { useScoreBoardContext } from '../../contexts/ScorePageContext';
import { HighScoreTable } from '../../components/HighScoreTable/HighScoreTable';
import { MobileHeader } from '../../components/mobile-header/MobileHeader';
import { ScoreTitle } from '../../components/score-title/ScoreTitle';
import { Loading } from '../loading/Loading';
import { useMediaQuery } from '@mui/material';
import './scorePage.scss';
import { useIsBigScreen } from '../../consts/consts';

export const ScorePage: React.FC = () => {

    const { isLoadingScores, getScores } = useScoreBoardContext();

    useEffect(() => {
        getScores();
    }, []);

    const isBigScreen = useIsBigScreen();

    return (
        <>
            {isLoadingScores
                ? <Loading />
                :
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
            }
        </>
    );
}

