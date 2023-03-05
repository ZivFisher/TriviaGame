
export interface Answer {
    id: number;
    content: string;
    isCorrect: boolean;
    image?: string;
}

export interface Question {
    id: number;
    title: string;
    image?: string;
    answers: Answer[];
}

export interface Quiz {
    title: string;
    description: string;
    image?: string;
}