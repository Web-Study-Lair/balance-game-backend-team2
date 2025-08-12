import { Expose } from 'class-transformer';

export class SelectResponseDto {
  @Expose()
  text: string;

  @Expose()
  img: string;

  @Expose()
  count: number;
}
