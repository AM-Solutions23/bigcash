import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

enum TipoUsuario{
    Fornecedor = "F",
    Consumidor = "C",
}

@Entity()
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    token_senha: string;

    @Column('text')
    tipo_usuario: TipoUsuario;

    @Column()
    nome: string;

    @Column()
    celular: number;

    @Column()
    external_login: boolean;

    @Column()
    foto: string;

    @Column()
    cpf: number;

    @Column()
    cnpj: number;

    @Column('date')
    data_nascimento: string;

    @Column()
    pais_id: number;

    @Column()
    cep: number;

    @Column()
    endereco: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    profissao_id: number;

    @Column('longtext')
    resumo_profissional: string;

    @Column()
    video_profissional: string;

    @Column()
    facebook: string;

    @Column()
    linkedin: string;

    @Column()
    lattes: string;

    @Column()
    youtube: string;

    @Column()
    curriculo: string;

    @Column()
    prestacao_servico_hora: boolean;

    @Column()
    tipos_repasses_pagamentos: number;
}
