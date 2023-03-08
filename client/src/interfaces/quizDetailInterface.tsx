
export interface Answer {
    tempId?: number;
    id?: number;
    content: string;
    isCorrect: boolean;
    image?: string;
    imageId?: number;
}

export interface Question {
    tempId?: number;
    id?: number;
    title: string;
    image?: string;
    imageId?: number;
    answers: Answer[];
}

export interface Quiz {
    id?: string;
    title: string;
    description: string;
    image: string;
    imageId?: number;
}

export interface EditQuiz extends Quiz {
    id: string;
    questions: Question[];
}