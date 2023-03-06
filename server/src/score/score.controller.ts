import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateScoreDto } from './score.dto';
import { ScoreService } from './score.service';

@Controller('/api/score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService
    ) { }

    @Post('/')
    create(@Body() score: CreateScoreDto) {
        try {
            return this.scoreService.create(score)
        } catch (e) {
            console.log(e)
            throw new BadRequestException()
        }
    }
}
