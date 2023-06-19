import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tags'})
export class TagEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string;
}