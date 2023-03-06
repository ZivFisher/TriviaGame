import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import configuration from './configuration';
import { ScoreModule } from './score/score.module';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [configuration]
    }),
    AuthModule,
    ScoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
