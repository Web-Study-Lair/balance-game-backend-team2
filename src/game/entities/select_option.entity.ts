import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { GameEntity } from "./game.entity";

@Entity('select_option')
@Unique(['id'])
export class SelectOptionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    text: string;

    @Column({ nullable: true, default: null })
    img: string;

    @Column({ nullable: false, default: 0 })
    count: number;

    // ManyToOne 데코레이션은 어찌됐든 관계 테이블의 PK를 가리킴
    @ManyToOne(() => GameEntity, (game) => game.id, {
        // 부모 데이터가 삭제될 때 함께 삭제되도록 하는 옵션
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'game_id' }) // 실제 DB 컬럼명
    game: GameEntity
}