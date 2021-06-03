import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Simulado {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo:string;

    
    @Column()
    status:boolean;

    
    @Column()
     tempo_finalizacao:number;

    
    @Column()
    usuario:number;

     
@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 