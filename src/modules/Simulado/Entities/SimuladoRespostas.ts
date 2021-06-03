import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class SimuladoRespostas {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    simulado_pergunta:number;

    
    @Column()
    resposta:string;

    
    @Column()
    resposta_correta:boolean;

     
@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 