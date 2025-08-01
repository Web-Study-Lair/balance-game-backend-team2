import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SelectOptionEntity } from "./select_option.entity";

@Entity('game')
@Unique(['id'])
export class GameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: null })
    title: string;

    @Column({ nullable: false })
    user_id: number;

    /**
     * TODO
     * 추후에 User 엔티티가 생기면 위의 user_id를 ManyToOne으로 변경
     * 참조 : https://marklee1117.tistory.com/45 
     */

    @OneToMany(() => SelectOptionEntity, (select_option) => select_option.game, {
        // find, findOne을 할 때마다 항상 관계 데이터를 JOIN함
        eager: true,
        // select_options에 selectOption이 추가된 상태에서 game이 저장될 때
        // select_options또한 반드시 db에 저장되도록 하는 옵션
        // 참조 : https://velog.io/@jeong3320/typeorm-cascade%EC%98%B5%EC%85%98
        cascade: true,
    })
    select_option: SelectOptionEntity[]
}