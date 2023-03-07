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

    @Column({ name: 'user_id', default: '685edf2e-7625-4bab-9e7e-d9cb5cc03dca' })
    userId: string;

    @OneToMany(() => Score, score => score.quiz, { cascade: true, onDelete: 'CASCADE' })
    scores: Score[];

    @OneToMany(() => Question, question => question.quiz, { cascade: true, onDelete: 'CASCADE' })
    questions: Question[];

}