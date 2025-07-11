import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto, UserDto } from './create-game.dto';
import { IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteGameDto extends PartialType(CreateGameDto) {
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto

    @IsNumber()
    gameId: number;
}
