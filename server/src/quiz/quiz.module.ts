import { UserModule } from '@hilma/auth-nest';
import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreModule } from 'src/score/score.module';
import { QuizController } from './quiz.controller';
import { Quiz } from './quiz.entity';
import { QuizService } from './quiz.service';

@Module({
  controllers: [
    QuizController
  ],
  providers: [QuizService],
  exports: [QuizService],
  imports: [
    TypeOrmModule.forFeature([Quiz]),
    ScoreModule,
    UserModule,
    FilesHandlerModule
  ]
})
export class QuizModule { }