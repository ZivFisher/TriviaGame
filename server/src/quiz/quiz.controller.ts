import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Controller('/api/quiz')
export class QuizController {
    constructor(
        private readonly quizService: QuizService
    ) { }

    @Get('/')
    getAll() {
        return this.quizService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.quizService.getQuizDetails(id);
    }

    @Get('/:id/scores')
    getQuizScores(@Param('id') id: string) {
        return this.quizService.getQuizScores(id);
    }

    @Post('/')
    create(@Body() quiz: Quiz) {
        return this.quizService.create(quiz);
    }

    @Delete('/')
    delete(@Param() id: string) {
        return this.quizService.delete(id);
    }
}
