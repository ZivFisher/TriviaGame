import { Question } from "src/question/question.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Answer {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @Column({ name: 'is_correct' })
    isCorrect: boolean;

    @Column({ nullable: true })
    image: string;

    @ManyToOne(() => Question, question => question.answers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'question_id' })
    question: Question;
}