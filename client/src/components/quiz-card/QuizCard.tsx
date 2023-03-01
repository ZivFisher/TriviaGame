import React from "react";
import { Link } from "react-router-dom";
import { QuizCardMobileMenu } from "./QuizCardMobileMenu";
import { useMediaQuery } from "@mui/material";
import './quiz-card.scss';



export interface QuizCardProps {
    id: number;
    image: string;
    title: string;
    description: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({ id, image, title, description }) => {

    const isBigScreen = useMediaQuery('(min-width: 600px)');

    return (
        <div className="quiz-card">
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
                        to='/score-board'
                        className="quiz-card-scoreBoard-btn">לוח תוצאות</Link>
                    :
                    <div>
                        <QuizCardMobileMenu />
                    </div>}
            </div>
            <div className="quiz-cards-links">
                <div className="quiz-cards-single-link-cover">
                    <img
                        className="quiz-cards-single-link"
                        src="./svg/link-share.svg"
                        alt="link share" />
                </div>
                <div className="quiz-cards-single-link-cover">
                    <img
                        className="quiz-cards-single-link"
                        src="./svg/edit-link.svg"
                        alt="edit link" />
                </div>
                <div className="quiz-cards-single-link-cover">
                    <img
                        className="quiz-cards-single-link"
                        src="./svg/trash.svg"
                        alt="trash" />
                </div>
            </div>
        </div>
    );
};