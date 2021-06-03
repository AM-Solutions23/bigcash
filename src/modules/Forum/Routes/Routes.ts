import {FormController} from "../Controllers/FormController";
import {auth} from "../../Auth/Middlewares/auth";
export const Routes = [{
    method: "get",
    route: "/forum",
    controller: FormController,
    action: "all",
    middleware: auth,
    action_key: "all_forum"
}, {
    method: "get",
    route: "/forum/:id",
    controller: FormController,
    middleware: auth,
    action: "one",
    action_key: "one_forum"
}, {
    method: "post",
    route: "/forum",
    controller: FormController,
    middleware: auth,
    action: "save",
    action_key: "save_forum"
}, {
    method: "delete",
    route: "/forum/:id",
    controller: FormController,
    middleware: auth,
    action: "remove",
    action_key: "remove_forum"
}];