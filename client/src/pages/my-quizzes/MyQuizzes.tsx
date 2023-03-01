import React from "react";
import { NoQuizzesFound } from "../../components/no-quizzes-found/NoQuizzesFound";
import { QuizCard } from "../../components/quiz-card/QuizCard";
import { QuizCardInterface } from "../../interfaces/myquizzesInterface";
import { useMediaQuery } from "@mui/material";
import './my-quizzes.scss';
import { MobileHeader } from "../../components/mobile-header/MobileHeader";


export const MyQuizzes: React.FC = () => {

    const isBigScreen = useMediaQuery('(min-width: 600px)');

    const [cards, setCards] = React.useState<QuizCardInterface[]>([
        {
            id: 1,
            quizId: 2,
            title: "גיאורגיה",
            description: "על גאורגיה אפשר למצוא הרבה דברים..",
            image: './svg/trash.svg'
        }
    ]);


    return (
        <div className="my-quizzes-div">
            {!isBigScreen &&
                <MobileHeader
                    showLogo={false}
                    title="החידונים שלי"
                />
            }
            <div className="my-quizzes-container">
                {isBigScreen
                    ? <h1 className="my-quizzes-title">החידונים שלי:</h1>
                    : null
                }
                <div className="cards-holder">
                    {cards.length === 0
                        ? <NoQuizzesFound />
                        : cards.map((card) => (
                            <QuizCard key={card.id}
                                id={card.quizId}
                                image={card.image}
                                title={card.title}
                                description={card.description}
                            />))
                    }
                </div>
            </div>
        </div>
    );
};
