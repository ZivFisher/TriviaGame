import React, { useState, createContext, useContext, FC, ReactNode } from "react";
import { Question, Quiz } from "../interfaces/quizDetailInterface";

interface QuizDetailInterface {
    quizDetails: Quiz;
    setQuizDetails: React.Dispatch<React.SetStateAction<Quiz>>;
    questions: Question[];
    setQuestions: (questions: Question[] | ((prev: Question[]) => Question[])) => void;
    onChangeQuestionTitle: (event: React.ChangeEvent<HTMLInputElement>, questionId: number) => void;
    deleteAnswer: (answerId: number, questionIndex: number) => void;
    markedAsCorrect: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
    changeAnswerContent: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
    deleteQuestion: (questionId: number) => void;
    activeQuestion: number;
    setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const QuizDetailsContext = createContext<QuizDetailInterface | null>(null);

export const useQuizDetails = () => {
    const result = useContext(QuizDetailsContext);
    if (!result) throw new Error("You forgot to put the QuizDetailsProvider!");
    return result;
};

export const QuizDetailsProvider: FC<{ children: ReactNode; }> = ({ children }) => {

    const [quizDetails, setQuizDetails] = useState<Quiz>({
        title: '',
        description: '',
    });
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            title: '',
            answers: [{ id: 1, content: '', isCorrect: true },
            { id: 2, content: '', isCorrect: false }]
        }
    ]);
    const [activeQuestion, setActiveQuestion] = useState<number>(questions.length - 1);
    const onChangeQuestionTitle = (event: React.ChangeEvent<HTMLInputElement>, questionId: number): void => {
        setQuestions(prev =>
            prev.map(question =>
                question.id === questionId
                    ? { ...question, title: event.target.value }
                    : question
            ));
    };

    const deleteQuestion = (questionId: number): void => {
        if (questions.length === 1) return;
        setQuestions(prev =>
            prev.filter(question =>
                question.id !== questionId
            ));
    };

    const deleteAnswer = (answerId: number, questionIndex: number): void => {
        if (questions[questionIndex].answers.length === 2) return;
        const tempArr = [...questions];
        tempArr[questionIndex].answers = tempArr[questionIndex].answers.filter(answer => answer.id !== answerId);
        setQuestions(tempArr);
    };

    const markedAsCorrect = (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number): void => {
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if (item.id === answerId && item.isCorrect === false) {
                    item.isCorrect = event.target.checked;
                } else if (item.isCorrect === true && item.id !== answerId) {
                    item.isCorrect = false;
                }
            });
            return [...prev];
        });
    };

    const changeAnswerContent = (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number): void => {
        const tempAnswersArr = [...questions[questionIndex].answers];
        tempAnswersArr.forEach((item) => {
            if (item.id === answerId) {
                item.content = event.target.value;
            }
        });
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if (item.id === answerId) {
                    item.content = event.target.value;
                }
            });
            return [...prev];
        });
    };

    return (
        <QuizDetailsContext.Provider value={{
            quizDetails,
            setQuizDetails,
            questions,
            setQuestions,
            onChangeQuestionTitle,
            deleteQuestion,
            deleteAnswer,
            markedAsCorrect,
            changeAnswerContent,
            activeQuestion,
            setActiveQuestion
        }}>
            {children}
        </QuizDetailsContext.Provider>
    );
};