import { ConnectionOptionsReader, getRepository, In } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Usuario } from "../Entities/Usuario";
import { UsuarioPerfis } from "../Entities/UsuarioPerfis";
import { PermissaoController } from "../../Permissao/Controllers/PermissaoController";
import * as jwt from "jsonwebtoken";

export class UsuarioController {
  private usuarioControllerRepository = getRepository(Usuario);
  private usuarioPerfisControllerRepository = getRepository(UsuarioPerfis);

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      response.status(200).logandjson({
        status: true,
        message: "Usuários listados com sucesso!",
        usuarios: await this.usuarioControllerRepository.find(),
      });
    } catch (error) {
      response
        .status(500)
        .logandjson({ status: false, message: "Falha ao listar usuários" });
    }
  }

  async one(request: Object) {
    return this.usuarioControllerRepository.findOne(request);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const check_ = await this.checkBeforeInsert(request.body);
      if (!check_) {
        if (!(await this.one({ id: request.body.credenciado })))
          return response.status(500).logandjson({
            status: false,
            message: "Credenciado não encontrado",
          });
        const user = await this.usuarioControllerRepository.save(request.body);

        if (request.body.perfil) {
          const perfil_user = { usuario: user.id, perfil: request.body.perfil };
          this.usuarioPerfisControllerRepository.save(
            Object.assign(new UsuarioPerfis(), perfil_user)
          );
        }
        response
          .status(200)
          .logandjson({ status: true, message: "Usuário criado com sucesso!" });
      } else {
        const field_ = check_["login"] ? "Login" : "CPF/CNPJ";
        response
          .status(500)
          .logandjson({ status: false, message: `Telefone já cadastrado!` });
      }
    } catch (error) {
      response.status(500).logandjson({
        status: false,
        message: "Falha ao cadastrar cadastrado!",
      });
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      const usuario = await this.usuarioControllerRepository.findOneOrFail(
        request.params.id
      );
      if (!usuario)
        return response
          .status(404)
          .logandjson({ status: true, message: "Usuário não encontrado!" });
      request.body.id = usuario.id;

      await this.usuarioControllerRepository.save(
        Object.assign(new Usuario(), request.body)
      );
      if (request.body.perfil) {
        const perfils = await this.usuarioPerfisControllerRepository.find({
          where: { usuario: usuario.id },
        });
        await this.usuarioPerfisControllerRepository.remove(perfils);
        request.body.perfil.forEach((perfil) => {
          this.usuarioPerfisControllerRepository.save(
            Object.assign(new UsuarioPerfis(), { usuario: usuario.id, perfil })
          );
        });
      }
      return response.status(200).logandjson({
        status: true,
        message: "Usuário atualizado com sucesso",
      });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let usuariocontrollerToRemove =
      await this.usuarioControllerRepository.findOne(request.params.id);
    await this.usuarioControllerRepository.remove(usuariocontrollerToRemove);
  }

  async remoteAcess(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.login) {
        const userToLogin = await new UsuarioController().one({
          login: request.params.login,
        });
        if (userToLogin) {
          const permissoes = await new PermissaoController().actions({
            permissao: userToLogin.permissao,
          });
          const token_ = jwt.sign(
            { id: userToLogin.id, permissoes: permissoes },
            "aemcli2021_ts_schema@"
          );
          userToLogin.token_session = token_;
          await this.usuarioControllerRepository.save(userToLogin);
          return response.status(200).logandjson(
            {
              status: true,
              token_,
              message: "Usuario acessado com sucesso!",
            },
            { id: userToLogin.id }
          );
        }
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async getSponsor(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.login) {
        const login = await this.usuarioControllerRepository.findOne({
          where: { login: request.params.login },
        });
        const patrocinador = await this.usuarioControllerRepository.findOne({
          where: { id: login.patrocinador },
        });
        return response.status(200).logandjson({
          status: true,
          message: patrocinador,
        });
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response
        .status(500)
        .logandjson({ status: false, message: await err });
    }
  }

  async getDirect(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.login) {
        const login = await this.usuarioControllerRepository.findOne({
          where: { login: request.params.login },
        });
        const patrocinados = await this.usuarioControllerRepository.find({
          where: { id: In(login.patrocinados) },
        });
        return response.status(200).logandjson({
          status: true,
          message: patrocinados,
        });
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async getIndirect(request: Request, response: Response, next: NextFunction) {
    ///////////////// AUMENTAR A QUANTIDADE DE REPETICOES
    try {
      if (request.params.login) {
        const login = await this.usuarioControllerRepository.findOne({
          where: { login: request.params.login },
        });
        const diretos = await this.usuarioControllerRepository.find({
          where: { id: In(login.patrocinados) },
        });
        let indiretos = [];
        for (var prop in diretos) {
          indiretos.push(
            await this.usuarioControllerRepository.find({
              where: { id: In(diretos[prop].patrocinados) },
            })
          );
        }
        return response.status(200).logandjson({
          status: true,
          message: indiretos,
        });
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async getUplines(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.login) {
        let uplines = [];
        const login = await this.usuarioControllerRepository.findOne({
          where: { login: request.params.login },
        });
        let sponsor = await this.usuarioControllerRepository.find({
          where: { id: login.patrocinador },
        });
        uplines.push(sponsor);
        ///ALTERAR NUMERO DE REPETICOES COM BASE NO PLANO
        for (let i = 0; i < 3; i++) {
          sponsor = await this.usuarioControllerRepository.find({
            where: { id: sponsor[0].patrocinador },
          });
          uplines.push(sponsor);
        }
        return response.status(200).logandjson({
          status: true,
          message: uplines,
        });
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async getDownlines(request: Request, response: Response, next: NextFunction) {
    try {
      if (request.params.login) {
        let downlines = [];
        let login = await this.usuarioControllerRepository.findOne({
          where: { login: request.params.login },
        });
        if (login.patrocinados) {
          downlines.push(login.patrocinados);
        }
        return response.status(200).logandjson({
          status: true,
          message: downlines
        });
      } else
        response
          .status(400)
          .logandjson({ status: false, message: "Usuario não encontrado" });
    } catch (err) {
      return response.status(500).logandjson({ status: false, message: err });
    }
  }

  async checkBeforeInsert(params) {
    return await this.usuarioControllerRepository
      .createQueryBuilder("usuario")
      .where(`usuario.telefone = "${params["telefone"]}"`)
      .getOne();
  }

  async getPerfils(usuario) {
    let perfis = [];
    const perfis_ = await this.usuarioPerfisControllerRepository.find({
      where: [{ usuario }],
      select: ["perfil"],
    });
    perfis_.forEach((perfil) => {
      perfis.push(perfil.perfil);
    });
    return perfis;
  }
}
