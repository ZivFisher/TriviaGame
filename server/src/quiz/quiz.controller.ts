import { FilesType, UseFilesHandler } from '@hilma/fileshandler-server';
import { Body, Controller, Delete, Get, Param, Post, UploadedFiles } from '@nestjs/common';
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

    @UseFilesHandler(100)
    @Post('/')
    create(@Body() quiz: any, @UploadedFiles() files: FilesType) {
        console.log('quiz: ', quiz)
        console.log('files!!!!!!!!!!:', files)
        return this.quizService.create(quiz, files);
    }

    @Delete('/')
    delete(@Param() id: string) {
        return this.quizService.delete(id);
    }
}
