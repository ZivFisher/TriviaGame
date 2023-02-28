import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
