import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('game')
@Unique(['game_id'])
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    game_id: string;

    @Column({ type: 'varchar', nullable: true })
    title?: string;

    @Column({ type: 'varchar', nullable: false })
    option_1_text: string;

    @Column({ type: 'varchar', nullable: true })
    option_1_img?: string;

    @Column({ type: 'varchar', nullable: false })
    option_2_text: string;

    @Column({ type: 'varchar', nullable: true })
    option_2_img?: string;

    @Column({ type: 'varchar', nullable: false })
    user_id: string;
}