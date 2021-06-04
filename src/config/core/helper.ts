import * as fs from 'fs';
class HelperAEMCLI{
    public static async validateQuestions(resps:Array<any>, actual_question:string){
        let response:boolean = false;
        const handler_validator = {
            name_validator: ['Module','Controller','Route','Entity'],
            route_validator: ['Module','Route'],
            route_file_validator: ['Route'],
            middleware_validator: ['Auth'],
            controller_validator : ['Module','Controller'],
            entity_validator:  ['Module', 'Entity', 'Controller'],
            entity_options_validator: ['Module', 'Entity', 'Controller'],
        };
        
        if(handler_validator[`${actual_question}_validator`].includes(resps['type'])) response = true;
        
        return response;
    }
    public static capitalizeString(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    public static saveFile(module, file){
        const pathname = `src/${module}/Storage/`;
        !fs.existsSync(pathname) && fs.mkdir(pathname, err =>{return !err;});
        fs.writeFileSync(`${pathname}/${file.file_name}`, file)
        return file.filename;
    }
}
export default HelperAEMCLI;