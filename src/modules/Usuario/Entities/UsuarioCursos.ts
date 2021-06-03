import {Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class UsuarioCursos {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Index()
    @Column()
    usuario:number;

    @Index()
    @Column()
    curso:number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

     } 