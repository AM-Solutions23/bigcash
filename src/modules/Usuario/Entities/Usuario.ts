import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate,
} from 'typeorm';
import { hash } from 'bcrypt';

@Entity()
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true })
	senha: string;

	@Column({ default: null })
	provider: string;

	@Column({ unique: true })
	cpf_cnpj: string;

	@Column()
	permissao: number;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at: Date;

	@BeforeInsert()
	@BeforeUpdate()
	async hashPassword() {
		this.senha = await hash(this.senha, 10);
	}
}
