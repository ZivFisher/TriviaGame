import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from 'src/quiz/quiz.entity';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
  imports: [
    TypeOrmModule.forFeature([
      Quiz,
      // Answer
    ])
  ]
})
export class QuestionModule { }
