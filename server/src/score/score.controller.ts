import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
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
            return this.scoreService.create(score);
        } catch (e) {
            console.log(e);
            throw new BadRequestException();
        }
    }
    @Get('/:id')
    getScoreByQuizId(@Param('id') id: string) {
        try {
            return this.scoreService.getScoresByQuizId(id);
        }
        catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) throw e;
            else throw new BadRequestException();
        }
    }

    @Get('/getById/:id')
    getScoreById(@Param('id') id: number) {
        try {
            return this.scoreService.getScoreById(id);
        }
        catch (e) {
            console.log(e);
            if (e instanceof NotFoundException) throw e;
            else throw new BadRequestException();
        }

    }
}
