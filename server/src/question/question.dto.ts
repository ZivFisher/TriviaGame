import { CreateAnswerDto } from './../answer/answer.dto';
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { Type } from 'class-transformer';
import { ValidateCorrectAnswer } from 'src/decorators/ValidateCorrectAnswerDecorator';
import { Answer } from 'src/answer/answer.entity';

export class CreateQuestionDto {
    @IsNotEmpty({ message: 'All questions must have a title and cannot be an empty string' })
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    title: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'Question image cannot be empty string' })
    image: string;

    @IsOptional()
    @IsNumber()
    imageId: number;


    @IsArray()
    @ArrayMinSize(2, { message: 'Each question must have at least 2 answer' })
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    @ValidateCorrectAnswer({ message: 'Every question must have only one correct answer' })
    answers: CreateAnswerDto[]
}
