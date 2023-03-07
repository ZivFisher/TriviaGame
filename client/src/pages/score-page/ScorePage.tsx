import { useEffect } from 'react';
import { useScoreBoardContext } from '../../contexts/ScorePageContext';
import { HighScoreTable } from '../../components/HighScoreTable/HighScoreTable';
import { MobileHeader } from '../../components/mobile-header/MobileHeader';
import { ScoreTitle } from '../../components/score-title/ScoreTitle';
import { Loading } from '../loading/Loading';
import { useIsBigScreen } from '../../consts/consts';

import './scorePage.scss';

export const ScorePage: React.FC = () => {

    const { isLoadingScores, getScores, scores } = useScoreBoardContext();
    const isBigScreen = useIsBigScreen();

    useEffect(() => {
        getScores();

    }, []);


    return (
        <>
            {isLoadingScores
                ? <Loading />
                :
                <div className='score-page-container'>
                    {!isBigScreen
                        ?
                        <MobileHeader title='החידונים שלי' showLogo={false} />
                        : null}
                    <ScoreTitle />
                    {!scores?.length
                        ?
                        <h2>לא נמצאו תוצאות למבחן זה</h2>
                        :
                        <HighScoreTable />}
                    {isBigScreen
                        ?
                        <img className='score-page-monkey'
                            src="../svg/winnerMonkey.svg"
                            alt="winner monkey" />
                        : null}
                </div>

            }
        </>
    );
}

