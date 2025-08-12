import { IsNumber, Max, Min } from 'class-validator';

export class UpdateSelectCountDto {
  @IsNumber()
  gameId: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  selectOption: number;

  @IsNumber()
  @Min(0)
  count: number;
}
