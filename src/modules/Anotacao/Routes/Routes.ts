import {AnotacaoController} from "../Controllers/AnotacaoController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/anotacoes",
    controller: AnotacaoController,
    action: "all",
    middleware: auth,
    action_key: "all_anotacoes"
}, {
    method: "get",
    route: "/anotacoes/:id",
    controller: AnotacaoController,
    middleware: auth,
    action: "one",
    action_key: "one_anotacoes"
}, {
    method: "post",
    route: "/anotacoes",
    controller: AnotacaoController,
    middleware: auth,
    action: "save",
    action_key: "save_anotacoes"
}, {
    method: "delete",
    route: "/anotacoes/:id",
    controller: AnotacaoController,
    middleware: auth,
    action: "remove",
    action_key: "remove_anotacoes"
}];