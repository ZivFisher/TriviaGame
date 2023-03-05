import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            username: "root",
            password: "z10mz10m",
            type: "mysql",
            database: "quiz_game",
            port: 3306,
            synchronize: true,
            logging: true,
            entities: [
                "dist/**/*.entity{.ts,.js}",
                'node_modules/@hilma/auth-nest/dist/access-logger/*.entity{.ts,.js}',
                'node_modules/@hilma/auth-nest/dist/role/*.entity{.ts,.js}',
                'node_modules/@hilma/auth-nest/dist/user/*.entity{.ts,.js}',
                'node_modules/@hilma/auth-nest/dist/user-password/*.entity{.ts,.js}'
            ]
        }),
    ],
})
export class DatabaseModule { }
