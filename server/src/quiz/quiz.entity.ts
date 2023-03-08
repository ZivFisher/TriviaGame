import { Question } from "src/question/question.entity";
import { Score } from "src/score/score.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MyUser } from '../auth/user.entity';


@Entity()
export class Quiz {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

<<<<<<< HEAD
    @Column({ name: 'user_id' })
    userId: string;

    @OneToMany(() => Score, score => score.quiz, { cascade: true })
    scores: Score[];

    @OneToMany(() => Question, question => question.quiz, { cascade: true })
    questions: Question[];

=======
    @OneToMany(() => Score, score => score.quiz, { cascade: true, onDelete: 'CASCADE' })
    scores: Score[];

    @OneToMany(() => Question, question => question.quiz, { cascade: true, onDelete: 'CASCADE' })
    questions: Question[];


    @ManyToOne(() => MyUser, user => user.quizzes, { onDelete: 'CASCADE' })
    user: MyUser;
>>>>>>> e75df88280caba74ad6afddefdace9c5487a31a0
}