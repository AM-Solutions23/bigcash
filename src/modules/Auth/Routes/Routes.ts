import {AuthController} from "../Controllers/AuthController";
import {auth} from "../Middlewares/auth";
export const Routes = [{
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login",
    action_key: "login_auth",
    module: 'Auth'
},{
    method: "post",
    route: "/auth/login-google",
    controller: AuthController,
    action: "loginGoogle",
    action_key: "google_auth",
    module: 'Auth'

}, {
    method: "get",
    route: "/auth/logout",
    controller: AuthController,
    action: "logout",
    middleware: auth,
    action_key: "logout_auth",
    module: 'Auth'

}];