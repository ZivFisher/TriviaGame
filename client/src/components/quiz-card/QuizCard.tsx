import { Link } from "react-router-dom";
import { QuizCardProps } from "./QuizCardProps";
import { QuizCardMobileMenu } from "./QuizCardMobileMenu";
import { AlertDialog } from "../alert-dialog/AlertDialog";
import { useMyQuizzesContext } from "../../contexts/MyQuizzesContext";
import { useIsBigScreen } from "../../consts/consts";
import MenuItem from "@mui/material/MenuItem";
import './quiz-card.scss';

export const QuizCard: React.FC<QuizCardProps> = ({ id, image, title, description, responseCount }) => {
    const { deleteQuizFromDB } = useMyQuizzesContext();
    const isBigScreen = useIsBigScreen();

    const shareQuiz = (onClick: () => void) => {
        navigator.clipboard.writeText(`http://localhost:3000/start-game?id=${id}`);
        return <MenuItem
            className="quiz-cards-single-link-cover"
            onClick={onClick}
        >
            <img
                className="quiz-cards-single-link"
                src="./svg/link-share.svg"
                alt="link share" />
        </MenuItem>;
    };

    const deleteQuizButton = (onClick: () => void) => {
        return <MenuItem
            className="quiz-cards-single-link-cover"
            onClick={onClick}
        >
            <img
                className="quiz-cards-single-link"
                src="./svg/trash.svg"
                alt="trash" />
        </MenuItem>;
    };


    return (
        <div className="quiz-card">
            <p className="response-count">אנשים שענו: {responseCount}</p>
            <img
                className="quiz-card-image"
                src={image}
                alt="quiz img" />
            <div className="quiz-card-content">
                <h1 className="quiz-card-title">{title}</h1>
                <p className="quiz-card-description">{description}</p>
                {isBigScreen
                    ?
                    <Link
                        to={encodeURI(`/score-board?id=${id}&title=${title}`)}
                        className="quiz-card-scoreBoard-btn">לוח תוצאות</Link>
                    :
                    <div>
                        <QuizCardMobileMenu
                            id={id}
                            image={image}
                            title={title}
                            description={description}
                            responseCount={responseCount} />
                    </div>}
            </div>
            <div className="quiz-cards-links">
                <AlertDialog
                    question="הקישור הועתק"
                    description="מצויין! עכשיו אתה יכול לשתף את החידון שלך עם חברים"
                    showCancelButton={false}
                    triggerButton={shareQuiz}
                />

                <Link
                    to={encodeURI(`/create-quiz?id=${id}`)}
                    className="quiz-cards-single-link-cover">
                    <img
                        className="quiz-cards-single-link"
                        src="./svg/edit-link.svg"
                        alt="edit link" />
                </Link>
                <AlertDialog
                    question="האם אתה בטוח?"
                    description="אם תמחק את החידון לא יהיה ניתן לשחק בו והנתונים ששמרת ימחקו"
                    onConfirm={() => deleteQuizFromDB(id)}
                    showCancelButton={true}
                    triggerButton={deleteQuizButton}
                />
            </div>
        </div>
    );
};