import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import axios from "axios";
import { Scores } from "../pages/score-page-interfaces/ScoresInterface";

const quizId = '685edf2e-7625-4bab-9e7e-d9cb5cc03dca'; //simulate the quizId that we will get from another context

interface ScoreBoardContextType {
    getScores: () => Promise<void>;
    scores: Scores[] | null | undefined;
    setScores: Dispatch<SetStateAction<Scores[] | null | undefined>>;
    isLoadingScores: boolean;
    setIsLoadingScores: Dispatch<SetStateAction<boolean>>;
}

export const ScoreBoardContext = createContext<ScoreBoardContextType | null>(null);

export const useScoreBoardContext = () => {
    const result = useContext(ScoreBoardContext);
    if (!result) throw new Error("You forgot to put the ScoreBoardProvider!");
    return result;
};


export const ScoreBoardProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [scores, setScores] = useState<Scores[] | null>();
    const [isLoadingScores, setIsLoadingScores] = useState<boolean>(false);
    const getScores = async () => {
        setIsLoadingScores(true);
        try {
            const { data } = await axios
                .get<Scores[] | null>(`http://localhost:8080/api/quiz/${quizId}/scores`);
            setScores(data);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingScores(false);
        }
    };

    return (
        <ScoreBoardContext.Provider value={{
            getScores,
            scores,
            setScores,
            isLoadingScores,
            setIsLoadingScores
        }}>
            {children}
        </ScoreBoardContext.Provider>
    );
};