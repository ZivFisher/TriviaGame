import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerController } from './answer.controller';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
  imports: [
    TypeOrmModule.forFeature([
      Answer
    ])
  ]
})
export class AnswerModule { }
