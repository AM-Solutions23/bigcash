import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class SimuladoQuestoes {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    simulado:number;

    
    @Column()
    usuario:number;

    
    @Column()
    materia:number;

    
    @Column()
    questao:string;

     
@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 