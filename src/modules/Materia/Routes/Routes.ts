import {MateriaController} from "../Controllers/MateriaController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/materias",
    controller: MateriaController,
    action: "all",
    middleware: auth,
    action_key: "all_materias"
}, {
    method: "get",
    route: "/materias/:id",
    controller: MateriaController,
    middleware: auth,
    action: "one",
    action_key: "one_materias"
}, {
    method: "post",
    route: "/materias",
    controller: MateriaController,
    middleware: auth,
    action: "save",
    action_key: "save_materias"
}, {
    method: "delete",
    route: "/materias/:id",
    controller: MateriaController,
    middleware: auth,
    action: "remove",
    action_key: "remove_materias"
}];