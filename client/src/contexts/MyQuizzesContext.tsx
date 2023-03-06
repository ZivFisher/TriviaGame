import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { QuizCardInterface } from "../interfaces/myquizzesInterface";


interface MyQuizzesContextType {
    cards: QuizCardInterface[] | null | undefined;
    setCards: Dispatch<SetStateAction<QuizCardInterface[] | undefined>>;
    getCards: (userId: string) => Promise<void>;
    deleteQuizFromDB: (id: string) => Promise<void>;
}

export const MyQuizzesContext = createContext<MyQuizzesContextType | null>(null);

export const useMyQuizzesContext = () => {
    const result = useContext(MyQuizzesContext);
    if (!result) throw new Error("You forgot to put the ScoreBoardProvider!");
    return result;
};


export const MyQuizzesProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

    const [cards, setCards] = useState<QuizCardInterface[]>();

    const getCards = async (userId: string) => {
        try {
            const { data } = await axios.get<QuizCardInterface[]>(`http://localhost:8080/api/quiz/${userId}/user-quizzes`);
            setCards(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteQuizFromDB = async (id: string) => {
        try {
            await axios.delete(`http://localhost:8080/api/quiz/${id}`);
            setCards(prev => prev?.filter(card => card.id !== id));
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <MyQuizzesContext.Provider value={{
            cards,
            setCards,
            getCards,
            deleteQuizFromDB
        }}>
            {children}
        </MyQuizzesContext.Provider>
    );
};