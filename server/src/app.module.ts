import { FilesHandlerModule } from '@hilma/fileshandler-server';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    FilesHandlerModule.register({
      autoAllow: true,
      folder: '../../files'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
