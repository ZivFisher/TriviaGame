import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    ScoreModule,
    FilesHandlerModule.register({
      autoAllow: true,
      folder: '../../files'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
