import { Answer } from "src/answer/answer.entity";
import { Quiz } from "src/quiz/quiz.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => Quiz, quiz => quiz.questions, { onDelete: 'CASCADE' })
    quiz: Quiz;

    @OneToMany(() => Answer, answer => answer.question, { cascade: true })
    answers: Answer[];
}