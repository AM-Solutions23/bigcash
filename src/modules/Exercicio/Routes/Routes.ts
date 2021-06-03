import {ExercicioController} from "../Controllers/ExercicioController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/exercicios",
    controller: ExercicioController,
    action: "all",
    middleware: auth,
    action_key: "all_exercicios"
}, {
    method: "get",
    route: "/exercicios/:id",
    controller: ExercicioController,
    middleware: auth,
    action: "one",
    action_key: "one_exercicios"
}, {
    method: "post",
    route: "/exercicios",
    controller: ExercicioController,
    middleware: auth,
    action: "save",
    action_key: "save_exercicios"
}, {
    method: "delete",
    route: "/exercicios/:id",
    controller: ExercicioController,
    middleware: auth,
    action: "remove",
    action_key: "remove_exercicios"
}];