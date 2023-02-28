import { Question } from "src/question/question.entity";
import { Score } from "src/score/score.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


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

    @OneToMany(() => Score, score => score.quiz)
    scores: Score[];

    @OneToMany(() => Question, question => question.quiz)
    questions: Question[];
}