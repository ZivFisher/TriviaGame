import { HighScoreBody } from './HighScoreBody';
import './highScoreTable.scss';

export const HighScoreTable: React.FC = () => {
    return (
        <div>
            <table className="score-table">
                <thead>
                    <tr>
                        <th className="score-index score-bold"></th>
                        <th className="score-name">שם</th>
                        <th>ציון</th>
                        <th className='score-date-margin'>תאריך</th>
                    </tr>
                </thead>
                <HighScoreBody />
            </table>
        </div>
    );
}

