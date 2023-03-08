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

    // async create(quizData: CreateQuizDto, files?: FilesType, userId: string) {
    //     const imageFile = files.find(file => file.originalname === String(quizData.imageId))
    //     quizData.image = await this.imageService.saveSingleFile([imageFile])

    //     for (let i = 0; i < quizData.questions.length; i++) {
    //         const question = quizData.questions[i];
    //         if (question.imageId || question.imageId === 0) {
    //             const imageFile = files.find(file => file.originalname === String(question.imageId))
    //             question.image = await this.imageService.saveSingleFile([imageFile])
    //             delete question.imageId
    //         }
    //         for (let j = 0; j < question.answers.length; j++) {
    //             const answer = question.answers[j];
    //             if (answer.imageId || answer.imageId === 0) {
    //                 const imageFile = files.find(file => file.originalname === String(answer.imageId))
    //                 answer.image = await this.imageService.saveSingleFile([imageFile])
    //                 delete answer.imageId
    //             }
    //         }
    //     }


    // quizData.user = new User({ id: userId })
    // quizData.user = { id: userId }

    // quizData.user = new User()
    // user.id = userId

    //     const quiz = this.quizRepository.create(quizData);
    //     console.log('quiz:', quiz)

    //     return this.quizRepository.save(quiz);
    // }

    async getQuizDetails(id: string) {
        const quiz = await this.quizRepository.findOne(
            {
                where: { id },
                relations: ['questions', 'questions.answers']
            });

        if (!quiz) throw new NotFoundException();
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

    async update(id: string, quizData: CreateQuizDto, files?: FilesType) {
        if (quizData.imageId || quizData.imageId === 0) {
            const imageFile = files.find(file => file.originalname === String(quizData.imageId))
            quizData.image = await this.imageService.saveSingleFile([imageFile])
        }
        for (let question of quizData.questions) {
            if (question.imageId || question.imageId === 0) {
                const imageFile = files.find(file => file.originalname === String(question.imageId))
                question.image = await this.imageService.saveSingleFile([imageFile])
                delete question.imageId
            }
            for (let answer of question.answers) {
                if (answer.imageId || answer.imageId === 0) {
                    const imageFile = files.find(file => file.originalname === String(answer.imageId))
                    answer.image = await this.imageService.saveSingleFile([imageFile])
                    delete answer.imageId
                }
            }
        }
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
