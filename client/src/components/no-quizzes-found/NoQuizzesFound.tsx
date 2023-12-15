import { Link } from 'react-router-dom';
import './no-quizzes-found.scss';


export const NoQuizzesFound: React.FC = () => {


    return (

        <div className="no-quizzes-container">
            <img
                className="no-quizzes-monkey"
                src="./svg/noQuizzesMonkey.svg"
                alt="" />
            <h1
                className="no-quizzes-question">
                יכול להיות שעדיין לא יצרת אף חידון?</h1>
            <Link
                to="/create-quiz"
                className="no-quizzes-button">
                אני רוצה ליצור עכשיו</Link>
        </div>
    );
};