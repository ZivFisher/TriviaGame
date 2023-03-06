import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Answer } from "src/answer/answer.entity";

@ValidatorConstraint({ name: 'ValidateCorrectAnswer' })
export class ValidateCorrectAnswerConstraint implements ValidatorConstraintInterface {
    validate(answers: Answer[]) {
        const correctAnswers = answers.filter(answer => answer.isCorrect)
        return correctAnswers.length === 1;
    }
}

/**
 * Checks if every question has one correct answer.
 */
export function ValidateCorrectAnswer(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions || undefined,
            constraints: [],
            validator: ValidateCorrectAnswerConstraint,

        })
    }
}