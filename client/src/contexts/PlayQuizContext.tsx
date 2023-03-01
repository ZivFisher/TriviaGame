import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Quiz } from "../interfaces/PlayQuizInterfaces";
import { testQuiz } from "../components/play-quiz/developmentData";
import { Question } from "../interfaces/PlayQuizInterfaces";

export interface PlayQuizContextType {
    quiz: Quiz;
    currentQuestion: Question;
    setCurrentQuestion: Dispatch<SetStateAction<Question>>;
    correctAnswers: number;
    setCorrectAnswers: Dispatch<SetStateAction<number>>;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
}

export const PlayQuizContext = createContext<PlayQuizContextType | null>(null);

export const usePlayQuiz = () => {
    const result = useContext(PlayQuizContext);
    if (!result) throw new Error("You forgot to put the PlayQuizProvider!");
    return result;
  }

export const PlayQuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [score, setScore] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(testQuiz.questions[0]);


    return (
        <PlayQuizContext.Provider value={{
            quiz:testQuiz,
            currentQuestion,
            setCurrentQuestion,
            correctAnswers,
            setCorrectAnswers,
            score,
            setScore,
        }}>
            {children}
        </PlayQuizContext.Provider>
    );
}

