import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto, UserDto } from './create-game.dto';
import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteGameDto extends PartialType(CreateGameDto) {
    @ValidateNested()
    @Type(() => UserDto)
    user: UserDto

    @IsString()
    balanceId: string;
}
