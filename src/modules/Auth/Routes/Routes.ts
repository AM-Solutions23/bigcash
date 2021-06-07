import {AuthController} from "../Controllers/AuthController";
import {auth} from "./../Middlewares/auth";
export const Routes = [{
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    middleware: auth,
    action_key: "all_auth"
}, {
    method: "get",
    route: "/auth/logout",
    controller: AuthController,
    action: "logout",
    middleware: auth,
    action_key: "one_auth"
}];