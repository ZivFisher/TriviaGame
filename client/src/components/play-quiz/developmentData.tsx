import { Quiz } from "../../interfaces/PlayQuizInterfaces";

export const testQuiz: Quiz = {
    quizId: 1,
    title: 'test quiz title',
    description: 'test quiz description',
    image: 'logo192.png',
    questions: [
        {
            questionId: 1,
            title: 'question 1',
            image:'dont-know.jpg',
            answers: [
                {
                    answerId: 1,
                    isCorrect: true,
                    image:'dont-know.jpg',
                    content: 'correct answer'
                },
                {
                    answerId: 2,
                    isCorrect: false,
                    content: 'false answer'
                },
                {
                    answerId: 3,
                    isCorrect: false,
                    content: 'false answer2'
                }
            ]
        },
        {
            questionId: 2,
            title: 'question 2',
            answers: [
                {
                    answerId: 3,
                    isCorrect: true,
                    content: 'correct answer'
                },
                {
                    answerId: 4,
                    isCorrect: false,
                    content: 'false answer'
                }
            ]
        }
    ]
};