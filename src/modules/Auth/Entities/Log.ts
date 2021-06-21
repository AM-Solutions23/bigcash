import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Index,
} from "typeorm";


@Entity()
export class Log {
	@PrimaryGeneratedColumn()
	id: number;

	@Index()
	@Column({nullable:true})
	usuario: number;

    @Column({nullable:true})
	user_ip: string;

    @Column({nullable:true})
	user_coordenadas: string;

    @Column({nullable:true})
	user_device: string;

    @Column()
	action_key: string;

	@Column()
	module: string;

	@Column()
	status: boolean;

	@Column({nullable:true, type:'longtext'})
	message: string;

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
