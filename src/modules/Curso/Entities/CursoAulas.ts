import {Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class CursoAulas {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Index()
    @Column()
    curso:number;

    @Index()
    @Column()
    aula:number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

     } 