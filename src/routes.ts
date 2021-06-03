import * as glob from 'glob';
import express from 'express';

let RoutesPaths = glob(`${__dirname}/**/Routes/*.ts`,{sync:true});
let Routes = [];
RoutesPaths
.forEach((route_group, key) => {
    const actual_route_group = require(`${route_group}`).Routes;   
    actual_route_group.forEach(route => {
        if(!route.middleware)
            route.middleware = (action:string,) => {
                return (req: express.Request,res: express.Response,next: express.NextFunction)=>{next()};
            }
    });
    Routes = [...Routes, ...actual_route_group]
});
export default Routes;