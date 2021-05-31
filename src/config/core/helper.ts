class HelperAEMCLI{
    public static async validateQuestions(resps:Array<any>, actual_question:string){
        let response:boolean = false;
        const handler_validator = {
            name_validator: ['Module','Controller','Route', 'Entity'],
            route_validator: ['Module','Controller','Route'],
            route_file_validator: ['Controller','Route'],
            middleware_validator: ['Auth','Module','Controller','Route'],
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
}
export default HelperAEMCLI;