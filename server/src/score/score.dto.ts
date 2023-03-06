import { IsDefined, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateScoreDto {

    @IsNotEmpty({ message: "Nickname can't be empty or undefined" })
    @IsString()
    nickname: string;

    @IsDefined({ message: "Score must be defined" })
    @IsInt()
    score: number;

    @IsNotEmpty({ message: "Quiz id can't be empty or undefined" })
    @IsString()
    quizId: string;
}