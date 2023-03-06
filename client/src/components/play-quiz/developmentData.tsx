import { Quiz } from "../../interfaces/PlayQuizInterfaces";

export const testQuiz: Quiz = {
    id: '1',
    title: 'test quiz title',
    description: 'test quiz description',
    image: 'logo192.png',
    questions: [
        {
            id: 1,
            title: 'question 1',
            image:'dont-know.jpg',
            answers: [
                {
                    id: 1,
                    isCorrect: true,
                    image:'dont-know.jpg',
                    content: 'correct answer'
                },
                {
                    id: 2,
                    isCorrect: false,
                    content: 'false answer'
                },
                {
                    id: 3,
                    isCorrect: false,
                    content: 'false answer2'
                }
            ]
        },
        {
            id: 2,
            title: 'question 2',
            answers: [
                {
                    id: 3,
                    isCorrect: true,
                    content: 'correct answer'
                },
                {
                    id: 4,
                    isCorrect: false,
                    content: 'false answer'
                }
            ]
        }
    ]
};