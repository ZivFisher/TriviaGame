import { FilesType, ImageService } from '@hilma/fileshandler-server';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './quiz.dto';
import { Quiz } from './quiz.entity';
import { Score } from '../score/score.entity';

@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
        private readonly imageService: ImageService
    ) { }

    getAll() {
        return this.quizRepository.find({ relations: ['questions', 'questions.answers'] });
    }

    async create(quizData: CreateQuizDto, files?: FilesType) {
        if (String(quizData.imageId)) {
            const imageFile = files.find(file => file.originalname === String(quizData.imageId))
            console.log('imageFile:', imageFile)
            quizData.image = await this.imageService.saveSingleFile([imageFile])
            delete quizData.imageId
        }

        for (let i = 0; i < quizData.questions.length; i++) {
            const question = quizData.questions[i];
            if (String(question.imageId)) {
                const imageFile = files.find(file => file.originalname === String(question.imageId))
                question.image = await this.imageService.saveSingleFile([imageFile])
                delete question.imageId
            }
            for (let j = 0; j < question.answers.length; j++) {
                const answer = question.answers[j];
                if (String(answer.imageId)) {
                    const imageFile = files.find(file => file.originalname === String(answer.imageId))
                    if (!imageFile) return;
                    answer.image = await this.imageService.saveSingleFile([imageFile])
                    delete answer.imageId
                }
            }
        }

        const errors = await validate(quizData);
        if (errors.length > 0) {
            throw new BadRequestException(errors.toString());
        }
        const quiz = this.quizRepository.create(quizData);
        return this.quizRepository.save(quiz);
    }

    createMyquiz(quiz: Partial<Quiz>) {
        return this.quizRepository.create(quiz);
    }

    async getQuizDetails(id: string) {
        const quiz = await this.quizRepository.find(
            {
                where: { id },
                relations: ['questions', 'questions.answers']
            });
        if (quiz.length === 0) throw new NotFoundException();
        return quiz;
    }

    async getUserQuizzes(userId: string,) {
        const quizzes = await this.quizRepository.createQueryBuilder('quiz')
            .select([
                'quiz.id id', 'title', 'description', 'image'
            ])
            .addSelect((sq) => sq
                .select('COUNT(score.id)', 'responseCount')
                .from(Score, 'score')
                .where('score.quizId = quiz.id'),
                'responseCount'
            )
            .where(`quiz.userId = :userId`, { userId })
            .getRawMany();
        if (quizzes.length === 0) {
            return [];
        }
        return quizzes;
    }

    async getQuizById(id: string) {
        const quiz = await this.quizRepository.findOne({ where: { id } });
        if (!quiz) throw new NotFoundException();
        return quiz;
    }

    async update(id: string, quizData: CreateQuizDto) {
        const existQuiz = await this.getQuizById(id);
        const updatedQuiz = this.quizRepository.create(quizData);
        updatedQuiz.scores = [];
        updatedQuiz.id = existQuiz.id;
        return this.quizRepository.save(updatedQuiz);
    }

    delete(id: string) {
        return this.quizRepository.delete(id);
    }
}
