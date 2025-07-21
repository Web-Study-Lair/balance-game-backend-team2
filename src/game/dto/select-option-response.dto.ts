import { Expose } from "class-transformer";

export class SelectOptionResponseDto {
    @Expose()
    text: string;

    @Expose()
    img: string;

    @Expose()
    count: number;
}