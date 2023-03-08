import { ChildEntity, Column, OneToMany } from 'typeorm';
import { User } from '@hilma/auth-nest';
import { Quiz } from 'src/quiz/quiz.entity';

@ChildEntity()
export class ExtendedUser extends User {

    @Column()
    id: string;

    @OneToMany(() => Quiz, quiz => quiz.extendeduser, { cascade: true })
    quizes: Quiz[]
}