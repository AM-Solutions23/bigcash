import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class PermissaoActions {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    permissao:number;

    
    @Column()
    action:string;

     
@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 