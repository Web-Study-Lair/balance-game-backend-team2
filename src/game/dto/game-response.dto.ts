import { Expose, Type } from 'class-transformer';
import { SelectResponseDto } from './select-response.dto';

export class GameResponseDto {
  // "id"컬럼을 "gameId"로 변형해서 반환
  @Expose({ name: 'id' })
  gameId: number;

  @Expose()
  title: string;

  // 외래키를 통해 JOIN해오는 select_option들을 list형태로 가져옴
  // 아마 OneToMany라서 list로 가져오는듯?
  @Expose({ name: 'select_option' })
  @Type(() => SelectResponseDto)
  selectOption: SelectResponseDto[];
}
