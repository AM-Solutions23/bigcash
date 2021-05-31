import * as glob from 'glob';

let RoutesPaths = glob(`${__dirname}/Modules/**/Routes/*.ts`,{sync:true});
let Routes = [];
RoutesPaths
.forEach(route => {
    Routes = [...Routes, ...require(`${route}`).Routes]
});
export default Routes;