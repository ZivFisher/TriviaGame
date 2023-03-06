import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizModule } from 'src/quiz/quiz.module';
import { ScoreController } from './score.controller';
import { Score } from './score.entity';
import { ScoreService } from './score.service';

@Module({
  controllers: [ScoreController],
  providers: [ScoreService],
  exports: [ScoreService],
  imports: [
    TypeOrmModule.forFeature([Score]),
    forwardRef(() => QuizModule)
  ]
})
export class ScoreModule { }
