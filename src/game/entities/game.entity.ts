import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('game')
@Unique(['game_id'])
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    game_id: string;

    @Column({
        type: 'varchar',
        default: null,
    })
    title?: string;

    @Column({ type: 'varchar', nullable: false })
    option_1_text: string;

    @Column()
    option_1_img: string;

    @Column({ type: 'varchar', nullable: false })
    option_2_text: string;

    @Column()
    option_2_img: string;
}