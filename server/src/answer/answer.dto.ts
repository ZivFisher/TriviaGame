import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsDefined({ message: 'isCorrect variable must be defined in each answer' })
    @IsBoolean()
    isCorrect: boolean;

    @IsOptional()
    @IsNotEmpty({ message: 'image cannot be an empty string' })
    @IsString()
    image: string;
}
