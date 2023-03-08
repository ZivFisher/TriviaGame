import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/quiz.entity';
import { Repository } from 'typeorm';
import { CreateScoreDto } from './score.dto';
import { Score } from './score.entity';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score)
        private readonly scoreRepository: Repository<Score>,
    ) { }

    async create(scoreData: CreateScoreDto) {
        const score = this.scoreRepository.create({
            ...scoreData,
            quiz: { id: scoreData.quizId } as Quiz
        });
        return this.scoreRepository.save(score);
    }

    async getScoresByQuizId(id: string) {
        try {
            const scores = await this.scoreRepository.find({
                where: {
                    quiz: {
                        id: id
                    }
                },
                order: {
                    score: "DESC"
                },
                take: 5
            });
            return scores;

        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async getScoreById(id: number) {
        return this.scoreRepository.findOne({
            where: {
                id
            },
            relations: ['quiz']
        });
    }
}
