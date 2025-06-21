import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";

export class UserDto {
    @IsString()
    userid: string;
}

export class BalanceOptionDto {
    @IsString()
    text: string;

    @IsOptional()
    img?: any;
}

export class BalanceDto {
    @IsOptional()
    @IsString()
    title?: string;

    // 중첩 객체에 대해 그 내부 속성까지 검증을 수행하게 해주는 데코레이터
    @ValidateNested()
    // 중첩 객체의 타입 지정
    @Type(() => BalanceOptionDto)
    option_1: BalanceOptionDto;

    @ValidateNested()
    @Type(() => BalanceOptionDto)
    option_2: BalanceOptionDto;
}

export class CreateGameDto {
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto;

    @ValidateNested()
    @Type(() => BalanceDto)
    balance: BalanceDto;
}
