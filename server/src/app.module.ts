import { Module } from '@nestjs/common';
import { QuizModule } from './quiz/quiz.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,

      logging: process.env.TYPEORM_LOGGING === 'on',
      synchronize: process.env.TYPEORM_SYNC === 'on',

      entities: [
        "dist/**/*.entity{.ts,.js}",
        'node_modules/@hilma/auth-nest/dist/access-logger/*.entity{.ts,.js}',
        'node_modules/@hilma/auth-nest/dist/role/*.entity{.ts,.js}',
        'node_modules/@hilma/auth-nest/dist/user/*.entity{.ts,.js}',
        'node_modules/@hilma/auth-nest/dist/user-password/*.entity{.ts,.js}'
      ]
    }),
    AuthModule,
    QuizModule,
    ScoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }