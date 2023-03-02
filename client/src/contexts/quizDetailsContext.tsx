
import axios from "axios";
import { title } from "process";
import React, { useState, createContext, useContext, FC, ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { EditQuiz, Question, Quiz } from "../interfaces/quizDetailInterface"

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
    handleSave: () => Promise<void>;
    getQuiz: (id: string) => Promise<void>;
}

const QuizDetailsContext = createContext<QuizDetailInterface | null>(null);

export const useQuizDetails = () => {
    const result = useContext(QuizDetailsContext);
    if (!result) throw new Error("You forgot to put the QuizDetailsProvider!");
    return result;
}

export const QuizDetailsProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [quizDetails, setQuizDetails] = useState<Quiz | EditQuiz>({
        title: '',
        description: '',
        image: 'example.img'
    });
    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            title: '',
            answers: [{ id: 1, content: '', isCorrect: true },
            { id: 2, content: '', isCorrect: false }]
        }
    ])
    const [activeQuestion, setActiveQuestion] = useState<number>(questions.length - 1);
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state !== null) {
            getQuiz('75902682-ea73-4db9-974f-4e8ba24db568');
        }
    }, [])

    const getQuiz = async (id: string) => {
        try {
            const { data } = await axios
                .get<EditQuiz[]>(`http://localhost:8080/api/quiz/${id}`)
            setQuestions(data[0].questions);
            setQuizDetails({
                title: data[0].title,
                image: data[0].image,
                description: data[0].description,
                id: data[0].id
            })
        } catch (error) {
            console.error(error);
        }
    }


    const onChangeQuestionTitle = (event: React.ChangeEvent<HTMLInputElement>, questionId: number): void => {
        setQuestions(prev =>
            prev.map(question =>
                question.id === questionId
                    ? { ...question, title: event.target.value }
                    : question
            ))
    }

    const deleteQuestion = (questionId: number): void => {
        if (questions.length === 1) return;
        setQuestions(prev =>
            prev.filter(question =>
                question.id !== questionId
            ))
    }

    const deleteAnswer = (answerId: number, questionIndex: number): void => {
        if (questions[questionIndex].answers.length === 2) return;
        const answerToDelete = questions[questionIndex].answers.find((answer) => answer.id === answerId);
        if (answerToDelete?.isCorrect) return;

        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const question = updatedQuestions[questionIndex];
            const updatedAnswers = question.answers.filter((answer) => answer.id !== answerId);
            const updatedQuestion = { ...question, answers: updatedAnswers };
            updatedQuestions[questionIndex] = updatedQuestion;

            return updatedQuestions;
        });
    }

    const markedAsCorrect = (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number): void => {
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if (item.id === answerId && item.isCorrect === false) {
                    item.isCorrect = event.target.checked;
                } else if (item.isCorrect === true && item.id !== answerId) {
                    item.isCorrect = false;
                }
            })
            return [...prev];
        });
    }

    const changeAnswerContent = (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number): void => {
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if (item.id === answerId) {
                    item.content = event.target.value;
                }
            })
            return [...prev];
        });
    }

    const handleSave = async () => {
        const quizCheck: boolean = quizDetails.description === '' || quizDetails.title === '' || quizDetails.image === '';
        const questionCheck: boolean = questions.some((item) => item.title === 'שאלה ללא כותרת' || item.title === '');
        const answerCheck: boolean = questions.some((question) => {
            return question.answers.some((item) => item.content === 'תשובה ללא תוכן' || item.content === '')
        });
        if (answerCheck || questionCheck || quizCheck) return;
        try {
            if (quizDetails.id) {
                const { data } = await axios
                    .post<Quiz | null>(`http://localhost:8080/api/quiz`, {
                        title: quizDetails.title,
                        description: quizDetails.description,
                        image: quizDetails.image,
                        questions: questions
                    })
            } else {
                const { data } = await axios
                    .post<Quiz | null>(`http://localhost:8080/api/quiz`, {
                        id: quizDetails.id,
                        title: quizDetails.title,
                        description: quizDetails.description,
                        image: quizDetails.image,
                        questions: questions
                    })
            }

            navigate('/my-quizzes');
        } catch (error) {
            console.error(error);
        }
    }

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
            setActiveQuestion,
            handleSave,
            getQuiz
        }}>
            {children}
        </QuizDetailsContext.Provider>
    );
}