import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";

export enum UserRole {
	EMPREENDEDOR = "empreendedor",
	CREDENCIADO = "credenciado",
	PARCEIRO = "parceiro",
}

@Entity()
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	senha: string;

	@Column()
	permissao: number;

	@Column({ type: "enum", enum: UserRole, default: UserRole.EMPREENDEDOR })
	tipo: UserRole;

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
