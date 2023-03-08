import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './quiz.dto';
import { Quiz } from './quiz.entity';
import { Score } from '../score/score.entity';
import { MyUser } from 'src/auth/user.entity';

@Injectable()
export class QuizService {

    constructor(
        @InjectRepository(Quiz)
        private readonly quizRepository: Repository<Quiz>,
    ) { }

    getAll() {
        return this.quizRepository.find({ relations: ['questions', 'questions.answers'] });
    }

    getQuizByUserId(id: string) {
        return this.quizRepository.find({
            where: {
                user: {
                    id: id
                }
            },
        })
    }

    async create(quizData: CreateQuizDto, id: string) {
        const errors = await validate(quizData);
        if (errors.length > 0) {
            throw new BadRequestException(errors.toString());
        }


        quizData.user = { id } as MyUser;
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

    async getUserQuizzes(userId: string) {
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
