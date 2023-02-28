import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            username: "root",
            password: "z10mz10m",
            type: "mysql",
            database: "quiz_game_db",
            port: 3306,
            synchronize: true,
            logging: true,
            entities: ["dist/**/*.entity{.ts,.js}"]
        }),
    ],
})
export class DatabaseModule { }
