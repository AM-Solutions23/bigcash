import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeUpdate,
	BeforeInsert,
} from 'typeorm';

import { hash } from 'bcrypt';
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
