import { useScoreBoardContext } from "../../contexts/ScorePageContext";
import { convertDate } from "../../consts/genericFunctions";

export const HighScoreBody: React.FC = () => {

    const { scores } = useScoreBoardContext();

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
            {scores?.map((score, index) => {
                return <tr key={index}>
                    <td className="score-index score-bold">
                        {index + 1}
                    </td>
                    <td className="score-name">{score.nickname}
                        {rankCheck(index)}
                    </td>
                    <td className="score-bold">{score.score}</td>
                    <td className='score-date score-date-margin'>
                        {convertDate(score.date)}
                    </td>
                </tr>;
            })}
        </tbody>
    );
}

