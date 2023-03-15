import React, { useState, createContext, useContext, FC, ReactNode, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FilesUploader } from "@hilma/fileshandler-client";
import { useAsyncState } from "@hilma/tools";
import { EditQuiz, Question, Quiz } from "../interfaces/quizDetailInterface";
import { usePlayQuiz } from "./PlayQuizContext";
import { Question as QuestionPlayQuiz } from '../interfaces/PlayQuizInterfaces';
import { basicQuestions, basicQuiz } from "../consts/quizDetailsConsts";

interface QuizDetailInterface {
    quizDetails: Quiz;
    setQuizDetails: React.Dispatch<React.SetStateAction<Quiz>>;
    questions: Question[];
    setQuestions: (questions: Question[] | ((prev: Question[]) => Question[])) => void;
    onChangeQuestionTitle: (event: string, questionId: number) => void;
    deleteAnswer: (answerId: number, questionIndex: number) => void;
    markedAsCorrect: (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number) => void;
    changeAnswerContent: (event: string, answerId: number, questionIndex: number) => void;
    deleteQuestion: (questionId: number) => void;
    activeQuestion: number;
    setActiveQuestion: React.Dispatch<React.SetStateAction<number>>;
    handleSave: () => Promise<void>;
    getQuiz: (id: string) => Promise<void>;
    deleteImg: (questionId?: number) => void;
    preView: () => void;
    filesUploader: FilesUploader;
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>;
    checkValidateQuiz: () => boolean;
}

const QuizDetailsContext = createContext<QuizDetailInterface | null>(null);

export const useQuizDetails = () => {
    const result = useContext(QuizDetailsContext);
    if (!result) throw new Error("You forgot to put the QuizDetailsProvider!");
    return result;
};


export const QuizDetailsProvider: FC<{ children: ReactNode; }> = ({ children }) => {
    const { setQuiz, setCurrentQuestion, filesUploader, quiz, setIsPreview } = usePlayQuiz();
    const [quizDetails, setQuizDetails] = useState<Quiz | EditQuiz>(basicQuiz);
    const [questions, setQuestions, getQuestions] = useAsyncState<Question[]>(basicQuestions);
    const [activeQuestion, setActiveQuestion] = useState<number>(0);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const edit = searchParams.get('edit');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (id) {
            getQuiz(id);
        } else if (edit && quiz) {
            setQuizDetails({
                title: quiz.title,
                description: quiz.description,
                image: quiz.image!,
                imageId: quiz.imageId
            });
            setQuestions(quiz.questions);
        } else {
            setQuizDetails(basicQuiz)
            setQuestions(JSON.parse(JSON.stringify(basicQuestions)))
        }
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        return () => {
            setQuizDetails(basicQuiz);
            setQuestions(basicQuestions);
        }
    }, [])

    const getQuiz = async (id: string) => {
        try {
            const { data } = await axios
                .get<EditQuiz>(`http://localhost:8080/api/quiz/${id}`);
            setQuestions(data.questions);
            setQuizDetails({
                title: data.title,
                image: data.image,
                description: data.description,
                id: data.id
            });
        } catch (error) {
            console.error(error);
        }
    };


    const onChangeQuestionTitle = (event: string, questionId: number): void => {
        setQuestions(prev =>
            prev.map(question =>
                (question.id || question.tempId) === questionId
                    ? { ...question, title: event }
                    : question
            ));
    };

    const deleteQuestion = async (questionId: number) => {
        if (questions.length === 1) return;
        setQuestions(prev =>
            prev.filter(question =>
                (question.id || question.tempId) !== questionId
            ));
        if (activeQuestion === (await getQuestions()).length) {
            setActiveQuestion(prev => prev - 1);
        }
    };

    const deleteAnswer = (answerId: number, questionIndex: number): void => {
        if (questions[questionIndex].answers.length === 2) return;
        const answerToDelete = questions[questionIndex].answers.find((answer) => (answer.id || answer.tempId) === answerId);
        if (answerToDelete?.isCorrect) return;

        setQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const question = updatedQuestions[questionIndex];
            const updatedAnswers = question.answers.filter((answer) => (answer.id || answer.tempId) !== answerId);
            const updatedQuestion = { ...question, answers: updatedAnswers };
            updatedQuestions[questionIndex] = updatedQuestion;

            return updatedQuestions;
        });
    };

    const markedAsCorrect = (event: React.ChangeEvent<HTMLInputElement>, answerId: number, questionIndex: number): void => {
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if ((item.id || item.tempId) === answerId && item.isCorrect === false) {
                    item.isCorrect = event.target.checked;
                } else if (item.isCorrect === true && (item.id || item.tempId) !== answerId) {
                    item.isCorrect = false;
                }
            });
            return [...prev];
        });
    };

    const changeAnswerContent = (event: string, answerId: number, questionIndex: number): void => {
        setQuestions(prev => {
            prev[questionIndex].answers.forEach((item) => {
                if ((item.id || item.tempId) === answerId) {
                    item.content = event;
                }
            });
            return [...prev];
        });
    };

    const deleteId = () => {
        const tempArr = JSON.parse(JSON.stringify(questions));
        tempArr.forEach((question: { id: any; answers: any[]; }) => {
            delete question.id;
            question.answers.forEach(answer => {
                delete answer.id;
            });
        });
        return tempArr;
    };

    const checkValidateQuiz = () => {
        const questionRegex: RegExp = /^.{5,30}$/;
        const quizTitleRegex: RegExp = /^.{5,25}$/;
        const quizDescriptionRegex: RegExp = /^.{5,40}$/;
        const answerRegex: RegExp = /^.{5,30}$/;
        const quizCheck: boolean = quizDetails.description === '' || !(quizDescriptionRegex.test(quizDetails.description)) || quizDetails.title === '' || !(quizTitleRegex.test(quizDetails.title)) || quizDetails.image === '';
        const questionCheck: boolean = questions.some((item) => item.title === 'שאלה ללא כותרת' || item.title === '' || !questionRegex.test(item.title));
        const answerCheck: boolean = questions.some((question) => {
            return question.answers.some((item) => item.content === 'תשובה ללא תוכן' || !answerRegex.test(item.content) || item.content === '' && item.image === '')
        });
        if (quizCheck) {
            setError('יש למלא את כל השדות ולהוסיף תמונה לחידון(הכותרת צריכה להכיל בין 5 ל-25 תווים והתיאור בין 5  ל-40 תווים)')
            return false;
        } else if (questionCheck) {
            setError('כל שאלה צריכה להכיל בין 5 ל-30 תווים')
            return false;
        } else if (answerCheck) {
            setError('כל תשובה צריכה להכיל בין 5 ל-30 תווים')
            return false;
        }
        else {
            return true;
        }
    }

    const handleSave = async () => {
        try {
            if (!quizDetails.id) {
                const arr = deleteId();
                await filesUploader.post<Quiz | null>(`http://localhost:8080/api/quiz`, {
                    title: quizDetails.title,
                    description: quizDetails.description,
                    image: quizDetails.image,
                    imageId: quizDetails.imageId,
                    questions: arr
                });
            } else {
                await filesUploader.put<Quiz | null>(`http://localhost:8080/api/quiz/${quizDetails.id}`, {
                    title: quizDetails.title,
                    description: quizDetails.description,
                    image: quizDetails.image,
                    questions: questions
                });
            }
            navigate('/my-quizzes');
        } catch (error) {
            console.error(error);
        }
    };

    const deleteImg = (questionId?: number) => {
        setQuestions(prev =>
            [...prev.map(question => {
                if (question.id === questionId) {
                    delete question.image;
                    delete question.imageId;
                }
                return question;
            })]
        );
    };

    const preView = () => {
        const quizCheck: boolean = quizDetails.description === '' || quizDetails.title === '' || quizDetails.image === '';
        const questionCheck: boolean = questions.some((item) => item.title === 'שאלה ללא כותרת' || item.title === '');
        const answerCheck: boolean = questions.some((question) => {
            return question.answers.some((item) => item.content === 'תשובה ללא תוכן' || item.content === '');
        });
        if (answerCheck || questionCheck || quizCheck) {
            setError('יש למלא את כל השדות הרלוונטיים לפני צפייה מקדימה בחידון.');
            return;
        }
        setIsPreview(true);
        setQuiz({
            title: quizDetails.title,
            description: quizDetails.description,
            image: quizDetails.image,
            imageId: quizDetails.imageId!,
            questions: questions as QuestionPlayQuiz[]
        });

        setCurrentQuestion(questions[0] as QuestionPlayQuiz);
        navigate('/start-game');
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
            setActiveQuestion,
            handleSave,
            getQuiz,
            deleteImg,
            preView,
            filesUploader,
            setError,
            error,
            checkValidateQuiz
        }}>
            {children}
        </QuizDetailsContext.Provider>
    );
};