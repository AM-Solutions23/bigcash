import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class AulaDocumentos {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    aula:number;

    
    @Column()
    nome:string;

    
    @Column()
    url:string;

    
    @Column()
    usuario:number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updated_at: Date;

     } 