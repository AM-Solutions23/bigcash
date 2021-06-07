import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from "typeorm";

export enum LogType {
	LOGIN = "login",
	LOGOUT = "logout",
	ACTION = "action",
}

@Entity()
export class Log {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column()
	usuario: number;

	@Column({ type: "enum", enum: LogType, default: LogType.LOGIN })
	tipo: LogType;

    @Column()
	user_ip: string;

    @Column()
	user_coordenadas: string;

    @Column()
	user_device: string;

    @Column()
	action_key: string;

	@CreateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	created_at: Date;

	@UpdateDateColumn({
		type: "timestamp",
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	updated_at: Date;
}
