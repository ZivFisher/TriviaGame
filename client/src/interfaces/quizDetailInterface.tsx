
export interface Answer {
    id: number;
    content: string;
    isCorrect: boolean;
    image?: string;
    imageId?: number;
}

export interface Question {
    id: number;
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