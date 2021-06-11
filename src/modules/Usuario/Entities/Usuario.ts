import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
@Entity()
export class Usuario {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	nome: string;

	@Column({ unique: true, nullable: true })
	email: string;

	@Column({ unique: true, nullable: true })
	login: string;

	@Column({ default: null })
	provider: string;

	@Column({ default: null })
	telefone: string;

	@Column({ default: null })
	patrocinador: number;

	@Column({ default: null })
	credenciado: number;

	@Column({ unique: true, nullable: true })
	cpf_cnpj: string;

	@Column({nullable: true})
	foto: string;

	@Column({default: 1})
	ativo: number;

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
}
