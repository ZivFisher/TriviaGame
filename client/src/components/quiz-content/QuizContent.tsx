import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect, useState } from "react";
import { useQuizDetails } from "../../contexts/quizDetailsContext";
import { Answer } from "../answer-interface/AnswerType";
import { QuizDetails } from "../create-quiz/QuizDetails";
import { QuizContentQuestions } from "./QuizContentQuestions";
import { MobileHeader } from "../mobile-header/MobileHeader";
import { AlertDialog } from "../alert-dialog/AlertDialog";
import './QuizContent.scss';

export const QuizContent: React.FC = () => {
    const isBigScreen = useMediaQuery('(min-width:600px)');
    const {
        questions,
        setQuestions,
        setActiveQuestion,
        handleSave,
        preView
    } = useQuizDetails();
    const [isNextPage, setIsNextPage] = useState<boolean>(false);
    const [questionId, setQuestionId] = useState<number>(2);



    const addQuestion = (): void => {
        if (questions.length === 10) return;
        setQuestions((prev) => {
            return [
                ...prev.map(question => ({
                    ...question,
                    title: question.title || 'שאלה ללא כותרת',
                    answers: question.answers.map(answer => ({
                        ...answer,
                        content: answer.content || 'תשובה ללא תוכן'
                    }))
                })),
                {
                    id: questionId,
                    title: '',
                    answers: [
                        { id: 1, content: '', isCorrect: true },
                        { id: 2, content: '', isCorrect: false }
                    ]
                }]
        });
        setQuestionId((prev) => prev + 1);
        setActiveQuestion(questions.length);
    }

    const copyQuestion = (copyQuestionIndex: number, answers: Answer[]): void => {
        if (questions.length === 10) return;
        setQuestions(prev => {
            if (prev[copyQuestionIndex].title === '') {
                prev[copyQuestionIndex].title = 'שאלה ללא כותרת'
            }
            prev[copyQuestionIndex].answers.forEach(answer => {
                if (answer.content === '') {
                    answer.content = 'תשובה ללא תוכן'
                }
            })
            const question = prev[copyQuestionIndex];
            const duplicatedItem = JSON.parse(JSON.stringify(question));
            duplicatedItem.id = questionId;
            prev.push(duplicatedItem);
            return [...prev]
        });
        setQuestionId((prev) => prev + 1);
        setActiveQuestion((prev) => prev + 1);
    }

    const onContinue = () => {
        setIsNextPage(true);
    }


    return (
        <div className="create-quiz-div">
            {isBigScreen
                ? <div className="quiz-option-div">
                    <button
                        className="show-quiz"
                        onClick={preView}
                    ><img src="/svg/preview.svg" alt="" />צפייה בחידון</button>
                    <div className="share-and-save">
                        <AlertDialog
                            question="שים לב"
                            description="אם תשמור את השינויים לוח התוצאות שלך יתאפס"
                            onConfirm={handleSave}
                            showCancelButton={true}
                            triggerButton={(onClick: () => void) => <button
                                className="save-quiz"
                                onClick={onClick}><img src="/svg/save.svg" alt="" />שמירה
                            </button>}
                        />
                    </div>
                </div>
                : <MobileHeader showLogo={true} title="יצירת משחק" />
            }
            <div className={!isNextPage
                ? "create-quiz-main-content"
                : "create-quiz-main-content create-quiz-main-content-new"} >
                <QuizDetails onContinue={onContinue} />
                <div className="questions-container-div">
                    <QuizContentQuestions copyQuestion={copyQuestion} />
                    {!isBigScreen &&
                        <div className="finish-edit-quiz">
                            <button
                                className='add-question-phone'
                                onClick={addQuestion}>
                                <img
                                    src="/svg/add-question-phone.svg"
                                    alt="add question"
                                    className="add-question-btn"
                                />הוספת שאלה</button>
                            <AlertDialog
                                question="שים לב"
                                description="אם תשמור את השינויים לוח התוצאות שלך יתאפס"
                                onConfirm={handleSave}
                                showCancelButton={true}
                                triggerButton={(onClick: () => void) => <button
                                    className='finish-edit'
                                    onClick={onClick}
                                >סיום</button>}
                            />
                        </div>}
                </div>
                <div>
                    {isBigScreen &&
                        <img src="/svg/plus.svg"
                            alt="add question"
                            onClick={addQuestion}
                            className='add-answer-photo' />}
                </div>
            </div>
        </div>
    );
}