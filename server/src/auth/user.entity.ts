import { ChildEntity, OneToMany } from "typeorm";
import { User } from '@hilma/auth-nest';
import { Quiz } from "src/quiz/quiz.entity";

@ChildEntity()
export class MyUser extends User {

    @OneToMany(() => Quiz, quiz => quiz.user, { cascade: true })
    quizzes?: Quiz[];
}