import { Dispatch, SetStateAction } from "react"

export interface Quiz {
    quizId: number;
    title: string;
    description: string;
    image?: string;
    questions: Question[]
}

export interface Question {
    questionId: number;
    title: string;
    image?: string;
    answers: Answer[]
}

export interface Answer {
    answerId: number;
    isCorrect: boolean;
    content: string;
    image?: string
}



