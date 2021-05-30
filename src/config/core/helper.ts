import * as inquirer from 'inquirer';

class HelperAEMCLI{
    public static async validateQuestions(resps:Array<any>, actual_question:string){
        let response:boolean = false;
        
        switch (actual_question) {
            case 'route':
            case 'entity_options':
                    response = resps['type'] === 'Module' || resps['type'] === this.capitalizeString(actual_question.trim().split('-')[0] || actual_question.trim());
                break;
            case 'controller':
                response = resps['type'] !== 'Entity';
                break;
            case 'entity':
                    response = resps['type'] !== 'Route';
                    break;
            case 'route_file':
                    response = resps['type'] !== 'Controller' && resps['type'] !== 'Entity';
                    break;
            default:
                break;
        }
        return response;
    }
    public static capitalizeString(str:string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
export default HelperAEMCLI;