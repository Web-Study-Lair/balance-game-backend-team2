import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'game' })
@Unique(['game_id'])
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    game_id: string;

    @Column({ type: 'varchar' })
    question: string;

    @Column({ type: 'varchar' })
    option_1: string;

    @Column({ type: 'varchar' })
    option_2: string;
}
