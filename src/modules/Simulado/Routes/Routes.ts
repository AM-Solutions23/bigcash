import {SimuladoController} from "../Controllers/SimuladoController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/simulados",
    controller: SimuladoController,
    action: "all",
    middleware: auth,
    action_key: "all_simulados"
}, {
    method: "get",
    route: "/simulados/:id",
    controller: SimuladoController,
    middleware: auth,
    action: "one",
    action_key: "one_simulados"
}, {
    method: "post",
    route: "/simulados",
    controller: SimuladoController,
    middleware: auth,
    action: "save",
    action_key: "save_simulados"
}, {
    method: "delete",
    route: "/simulados/:id",
    controller: SimuladoController,
    middleware: auth,
    action: "remove",
    action_key: "remove_simulados"
}];