import {Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Aula {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nome:string;

    @Index()
    @Column()
    usuario:number;
    
    @Column()
    video:string;

    
    @Column()
    finalizado:boolean;

    
    @Column()
    status:boolean;
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

     } 