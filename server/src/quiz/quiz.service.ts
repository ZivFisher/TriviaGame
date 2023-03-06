import { FilesType, ImageService } from '@hilma/fileshandler-server';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/answer/answer.entity';
import { Question } from 'src/question/question.entity';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly imageService: ImageService
    ) { }

    async getQuizScores(id: string) {
        const quiz = await this.quizRepository.findOne(
            {
                where: { id },
                relations: { scores: true },
                order: {
                    scores: {
                        score: "DESC"
                    }
                }
            }
        );

        if (!quiz) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);
        }

        const first5Scores = quiz.scores.slice(0, 5);

        return first5Scores;
    }

    getAll() {
        return this.quizRepository.find({ relations: ['questions', 'questions.answers'] });
    }

    async create(quizData: Quiz & { imageId?: number }, files?: FilesType) {
        if (String(quizData.imageId)) {
            const imageFile = files.find(file => file.originalname === String(quizData.imageId))
            console.log('imageFile:', imageFile)
            quizData.image = await this.imageService.saveSingleFile([imageFile])
        }

        if (!quizData?.title || !quizData?.description) {
            throw new BadRequestException('Title and description are required');
        }

        if (!quizData?.image) {
            throw new BadRequestException('Quiz image is required');
        }

        if (!quizData?.questions || !(quizData?.questions?.length > 0)) {
            throw new BadRequestException('Quiz questions is required');
        }

        const quiz = new Quiz();
        quiz.title = quizData.title;
        quiz.description = quizData.description;
        quiz.image = quizData.image;

        const questions = [];
        quizData.questions.forEach((questionData) => {

            if (!questionData?.title) {
                throw new BadRequestException('Questions must have a title');
            }

            if (!questionData?.answers || !(questionData?.answers?.length > 0)) {
                throw new BadRequestException('Question must have at least one answer');
            }

            const answers = [];
            let hasCorrectAnswer = false;

            questionData.answers.forEach((answerData) => {
                if (!answerData?.content) {
                    throw new BadRequestException('Answers must have a content');
                }

                const answer = new Answer();
                answer.content = answerData?.content;
                answer.isCorrect = answerData?.isCorrect;
                answer.image = answerData?.image;

                if (answer.isCorrect) {
                    hasCorrectAnswer = true;
                }

                answers.push(answer);
            });

            if (!hasCorrectAnswer) {
                throw new BadRequestException('Question must have at least one correct answer');
            }

            const question = new Question();
            question.title = questionData?.title;
            question.image = questionData?.image;
            question.answers = answers;
            questions.push(question);
        });

        if (questions.length === 0) {
            throw new Error('Quiz must have at least one question');
        }

        quiz.questions = questions;

        return this.quizRepository.save(quiz);
    }


    delete(id: string) {
        return this.quizRepository.delete(id);
    }

    async getQuizDetails(id: string) {
        const quiz = await this.quizRepository.find(
            {
                where: { id },
                relations: ['questions', 'questions.answers']
            });

        if (quiz.length === 0) {
            throw new NotFoundException(`Quiz with ID ${id} not found`);

        }

        return quiz;
    }

}
