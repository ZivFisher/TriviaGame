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

    //TODO: Add userId field and his relation to User entity.

    @OneToMany(() => Score, score => score.quiz, { cascade: true })
    scores: Score[];

    @OneToMany(() => Question, question => question.quiz, { cascade: true })
    questions: Question[];
}