import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { Quiz } from "../interfaces/PlayQuizInterfaces";
import { Question } from "../interfaces/PlayQuizInterfaces";
import { FilesUploader, useFiles } from "@hilma/fileshandler-client";

export interface PlayQuizContextType {
    quiz: Quiz;
    currentQuestion: Question | undefined;
    setCurrentQuestion: Dispatch<SetStateAction<Question | undefined>>;
    correctAnswers: number;
    setCorrectAnswers: Dispatch<SetStateAction<number>>;
    score: number;
    setScore: Dispatch<SetStateAction<number>>;
    nickname: string;
    setNickname: Dispatch<SetStateAction<string>>;
    sendScoreToServer: (call: (id: number | null) => void) => Promise<any>;
    setQuiz: Dispatch<SetStateAction<Quiz>>;
    filesUploader: FilesUploader;
}

export const PlayQuizContext = createContext<PlayQuizContextType | null>(null);

export const usePlayQuiz = () => {
    const result = useContext(PlayQuizContext);
    if (!result) throw new Error("You forgot to put the PlayQuizProvider!");
    return result;
};

export const PlayQuizProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

    const [score, setScore] = useState<number>(0);
    const [correctAnswers, setCorrectAnswers] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>();
    const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
    const [nickname, setNickname] = useState<string>('');
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const filesUploader = useFiles();

    useEffect(() => {
        fetchQuiz();
        // eslint-disable-next-line
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

    const sendScoreToServer = async (call: (id: number | null) => void) => {
        if (!nickname) call(null);
        const API_ENDPOINT = 'http://localhost:8080/api/score';
        const requestBody = {
            nickname,
            quizId: quiz.id,
            score: Math.round(score)
        };
        try {
            const { data } = await axios.post(API_ENDPOINT, requestBody);
            call(data.id);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <PlayQuizContext.Provider value={{
            quiz: quiz,
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
            filesUploader
        }}>
            {children}
        </PlayQuizContext.Provider>
    );
}

