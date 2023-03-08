import { CreateQuestionDto } from './../question/question.dto';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { Question } from 'src/question/question.entity';

export class CreateQuizDto {
    @IsNotEmpty({ message: 'Quiz title is required and it cannot be an empty string' })
    @IsString()
    @MaxLength(30)
    title: string;

    @IsNotEmpty({ message: 'Quiz description is required and it cannot be an empty string' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Quiz image is required and it cannot be an empty string' })
    @IsString()
    image: string;

    @IsOptional()
    @IsNumber()
    imageId: number;



    @IsNotEmpty({ message: 'Quiz questions array is required' })
    @IsArray()
    @ArrayMinSize(1, { message: 'Every quiz must have at least one question' })
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDto)
    questions: CreateQuestionDto[]
}