import {AulaController} from "../Controllers/AulaController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/aulas",
    controller: AulaController,
    action: "all",
    middleware: auth,
    action_key: "all_aulas"
}, {
    method: "get",
    route: "/aulas/:id",
    controller: AulaController,
    middleware: auth,
    action: "one",
    action_key: "one_aulas"
}, {
    method: "post",
    route: "/aulas",
    controller: AulaController,
    middleware: auth,
    action: "save",
    action_key: "save_aulas"
}, {
    method: "delete",
    route: "/aulas/:id",
    controller: AulaController,
    middleware: auth,
    action: "remove",
    action_key: "remove_aulas"
}];