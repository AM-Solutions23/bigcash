import {UsuarioController} from "../Controllers/UsuarioController";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UsuarioController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UsuarioController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UsuarioController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UsuarioController,
    action: "remove"
}];