import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Anotacao {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    titulo:string;

    
    @Column("longtext")
    anotacao:string;

    
    @Column()
    aula:number;

    
    @Column()
    usuario:string;

     
@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 