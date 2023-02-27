export const HighScoreBody: React.FC = () => {
    const scores = [
        {
            name: 'אחותךך',
            grade: '100',
            date: '21/03/21'
        },
        {
            name: 'צבי כהן',
            grade: '90',
            date: '21/05/21'
        },
        {
            name: 'אנונימי',
            grade: '80',
            date: '21/07/21'
        },
        {
            name: 'ילד פלא',
            grade: '60',
            date: '21/03/21'
        },
        {
            name: 'נעמה יצחק',
            grade: '50',
            date: '21/09/21'
        }
    ];

    const rankCheck = (index: number) => {
        switch (index) {
            case 0:
                return <img className='score-crown'
                    src='./svg/golden-crown.svg' alt='golden crown' />;
            case 1:
                return <img className='score-crown'
                    src='./svg/silver-crown.svg' alt='silver crown' />;
            case 2:
                return <img className='score-crown'
                    src='./svg/bronze-crown.svg' alt='bronze crown' />;
        }
    };
    return (
        <tbody>
            {scores.map((score, index) => {
                return <tr>
                    <td className="score-index score-bold">

                        {index + 1}
                    </td>

                    <td className="score-name">{score.name}
                        {rankCheck(index)}
                    </td>
                    <td className="score-bold">{score.grade}</td>
                    <td className='score-date score-date-margin'>{score.date}
                    </td>
                </tr>;
            })}

        </tbody>
    );
}

