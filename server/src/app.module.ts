import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import configuration from './configuration';

@Module({
  imports: [
    DatabaseModule,
    QuizModule,
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
