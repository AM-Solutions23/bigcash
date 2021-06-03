import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    nome:string;

    
    @Column()
    status:boolean;

    
    @Column()
    usuario:number;

    
    @Column()
    descricao:string;

    
    @Column()
    foto:string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

     } 