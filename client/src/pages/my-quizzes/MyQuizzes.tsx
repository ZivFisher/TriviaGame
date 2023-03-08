import React, { useEffect } from "react";
import { QuizCard } from "../../components/quiz-card/QuizCard";
import { NoQuizzesFound } from "../../components/no-quizzes-found/NoQuizzesFound";
import { MobileHeader } from "../../components/mobile-header/MobileHeader";
import { useIsBigScreen } from "../../consts/consts";
import { useMyQuizzesContext } from "../../contexts/MyQuizzesContext";
import { Loading } from "../loading/Loading";
import './my-quizzes.scss';


export const MyQuizzes: React.FC = () => {

    const isBigScreen = useIsBigScreen();
    const { cards, getCards, isLoadingQuizzes } = useMyQuizzesContext();
    const userId = '685edf2e-7625-4bab-9e7e-d9cb5cc03dca';

    useEffect(() => {
        getCards(userId);
    }, []);

    if (isLoadingQuizzes) return (<Loading />);

    return (
        <div className="my-quizzes-div">
            {!isBigScreen
                ?
                <MobileHeader
                    showLogo={false}
                    title="החידונים שלי"
                />
                : null}
            <div className="my-quizzes-container">
                {isBigScreen
                    ? <h1 className="my-quizzes-title">החידונים שלי:</h1>
                    : null}
                <div className="cards-holder">
                    {!cards?.length
                        ? <NoQuizzesFound />
                        : cards?.map((card) => (
                            <QuizCard key={card.id}
                                id={card.id}
                                image={card.image}
                                title={card.title}
                                description={card.description}
                                responseCount={card.responseCount}
                            />))
                    }
                </div>
            </div>
        </div>
    );
};
