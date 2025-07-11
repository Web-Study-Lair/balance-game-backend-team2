import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SelectOptionEntity } from "./select_option.entity";

@Entity('game')
@Unique(['id'])
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: null })
    title?: string;

    @Column({ nullable: false })
    user_id: number;

    /**
     * TODO
     * 추후에 User 엔티티가 생기면 위의 user_id를 ManyToOne으로 변경
     * https://marklee1117.tistory.com/45 참조
     */

    @OneToMany(() => SelectOptionEntity, (option) => option.game)
    options: SelectOptionEntity[]
}