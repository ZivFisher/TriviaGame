import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    ScoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
