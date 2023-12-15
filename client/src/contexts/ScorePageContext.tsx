import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Scores } from "../pages/score-page-interfaces/ScoresInterface";


interface ScoreBoardContextType {
    getScores: () => Promise<void>;
    scores: Scores[] | null | undefined;
    setScores: Dispatch<SetStateAction<Scores[] | null | undefined>>;
    isLoadingScores: boolean;
    setIsLoadingScores: Dispatch<SetStateAction<boolean>>;
    quizTitle: string | null | undefined;
    setQuizTitle: Dispatch<SetStateAction<string | null>>;
}

export const ScoreBoardContext = createContext<ScoreBoardContextType | null>(null);

export const useScoreBoardContext = () => {
    const result = useContext(ScoreBoardContext);
    if (!result) throw new Error("You forgot to put the ScoreBoardProvider!");
    return result;
};


export const ScoreBoardProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

    const [scores, setScores] = useState<Scores[] | null>();
    const [isLoadingScores, setIsLoadingScores] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get('id');
    const title = searchParams.get('title');
    const [quizTitle, setQuizTitle] = useState<string | null>(title || null);

    const getScores = async () => {
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
            setIsLoadingScores,
            quizTitle,
            setQuizTitle
        }}>
            {children}
        </ScoreBoardContext.Provider>
    );
};