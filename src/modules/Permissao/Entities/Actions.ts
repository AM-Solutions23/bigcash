import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { PermissaoActions } from "./PermissaoActions";

@Entity()
export class Actions {
    static forEach(arg0: (action: any) => void) {
        throw new Error('Method not implemented.');
    }

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    action:string;

@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
created_at: Date;

@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
updated_at: Date;
} 