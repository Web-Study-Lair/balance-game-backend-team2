import { IsOptional, IsString } from "class-validator";

export class CreateGameDto {
    @IsString()
    @IsOptional()
    question: string;

    @IsString()
    option_1: string;

    @IsString()
    option_2: string;
}
