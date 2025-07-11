import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class UserDto {
    @IsNumber()
    userId: number;
}

export class GameOptionDto {
    @IsString()
    text: string;

    @IsOptional()
    img?: any;
}

export class GameDto {
    @IsOptional()
    @IsString()
    title?: string;

    // 중첩 객체에 대해 그 내부 속성까지 검증을 수행하게 해주는 데코레이터
    @ValidateNested()
    // 중첩 객체의 타입 지정
    @Type(() => GameOptionDto)
    option1: GameOptionDto;

    @ValidateNested()
    @Type(() => GameOptionDto)
    option2: GameOptionDto;
}

export class CreateGameDto {
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;

    @ValidateNested()
    @Type(() => GameDto)
    game: GameDto;
}
