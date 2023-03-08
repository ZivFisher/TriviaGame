export interface Quiz {
    id: string;
    title: string;
    description: string;
    image?: string;
    questions: Question[];
}

export interface Question {
    id: number;
    title: string;
    image?: string;
    answers: Answer[];
}

export interface Answer {
    id: number;
    isCorrect: boolean;
    content: string;
    image?: string
}



