import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GameEntity {
    @PrimaryGeneratedColumn('uuid')
    userid: string;

    @Column({ type: 'varchar' })
    question: string;

    @Column({ type: 'varchar' })
    option1: string;

    @Column({ type: 'varchar' })
    option2: string;
}
