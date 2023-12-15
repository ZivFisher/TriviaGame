import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useAsyncState } from "@hilma/tools";
import { Quiz } from "../interfaces/PlayQuizInterfaces";
import { Question } from "../interfaces/PlayQuizInterfaces";
import { FilesUploader, useFiles } from "@hilma/fileshandler-client";

export interface PlayQuizContextType {
    quiz: Quiz | null;
    setQuiz: Dispatch<SetStateAction<Quiz | undefined>>;
    currentQuestion: Question | undefined;
    setCurrentQuestion: Dispatch<SetStateAction<Question | undefined>>;
    correctAnswers: number;
    setCorrectAnswers: Dispatch<SetStateAction<number>>;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;
    sendScoreToServer: (call: (id?: number) => void) => Promise<any>;
    filesUploader: FilesUploader;
    setIsPreview: Dispatch<SetStateAction<boolean>>;
    isPreview: boolean;
    backToEdit: () => void;
    fetchQuiz: () => Promise<void>;

}

export const PlayQuizContext = createContext<PlayQuizContextType | null>(null);

export const usePlayQuiz = () => {
    const result = useContext(PlayQuizContext);
    if (!result) throw new Error("You forgot to put the PlayQuizProvider!");
    return result;
};

export const PlayQuizProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

    const [score, setScore, getScore] = useAsyncState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [quiz, setQuiz] = useState<Quiz>();
    const [nickname, setNickname] = useState<string>('');
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const filesUploader = useFiles();
    const navigate = useNavigate();
    const [isPreview, setIsPreview] = useState<boolean>(false);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            if (!id) return;
            let { data } = await axios.get(`http://localhost:8080/api/quiz/${id}`);
            setQuiz(data);
            setCurrentQuestion(data.questions[0]);
        } catch (e) {
            console.log(e);
        }
    };

    const sendScoreToServer = async (call: (id?: number) => void) => {
        if (!quiz?.id) {
            call();
            return;
        }
        const scored = await getScore();
        const API_ENDPOINT = 'http://localhost:8080/api/score';
        const requestBody = {
            nickname,
            quizId: quiz?.id,
            score: Math.round(scored)
        };
        try {
            const { data } = await axios.post(API_ENDPOINT, requestBody);
            call(data.id);
        } catch (e) {
            console.log(e);
        }
    };

    const backToEdit = () => {
        navigate('create-quiz?edit=true');
    };

    return (
        <PlayQuizContext.Provider value={{
            quiz: quiz || null,
            setQuiz,
            currentQuestion,
            setCurrentQuestion,
            correctAnswers,
            setCorrectAnswers,
            score,
            setScore,
            nickname,
            setNickname,
            sendScoreToServer,
            filesUploader,
            setIsPreview,
            isPreview,
            backToEdit,
            fetchQuiz
        }}>
            {children}
        </PlayQuizContext.Provider>
    );
}

