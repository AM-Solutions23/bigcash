import {CursoController} from "../Controllers/CursoController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/cursos",
    controller: CursoController,
    action: "all",
    middleware: auth,
    action_key: "all_cursos"
}, {
    method: "get",
    route: "/cursos/:id",
    controller: CursoController,
    middleware: auth,
    action: "one",
    action_key: "one_cursos"
}, {
    method: "post",
    route: "/cursos",
    controller: CursoController,
    middleware: auth,
    action: "save",
    action_key: "save_cursos"
}, {
    method: "delete",
    route: "/cursos/:id",
    controller: CursoController,
    middleware: auth,
    action: "remove",
    action_key: "remove_cursos"
}];