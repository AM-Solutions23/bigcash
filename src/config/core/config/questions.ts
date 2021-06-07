import HelperAEMCLI from '../helper';

const questionsConfig = [{
    "type": "list",
    "name": "type",
    "message": "Selecione o tipo:",
    "choices":['Module','Controller','Route','Entity','Auth']
},
{
  "type": "input",
  "name": "name",
  "message": "Selecione o nome da pasta do módulo desejado:",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps,'name')},
},
{
  "type": "input",
  "name": "route",
  "message": "Selecione o prefixo da rota:",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps,'route')},
},
{
  "type": "input",
  "name": "route_file",
  "message": "Selecione o nome do seu arquivo de rotas:",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps, 'route_file')},
  "default": "Routes"
},
{
  "type": "input",
  "name": "middleware",
  "message": "Selecione o nome do seu middleware",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps, 'middleware')}
},
{
  "type": "input",
  "name": "controller",
  "message": "Selecione o nome da sua controller:",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps, 'controller')}
},
{
  "type": "input",
  "name": "entity",
  "message": "Selecione o nome da sua entidade:",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps, 'entity')}
},
{
  "type": "input",
  "name": "entity_options",
  "message": "Selecione os campos do banco: (ex.: col1:string,col2:number)",
  "when": (resps)=>{return HelperAEMCLI.validateQuestions(resps, 'entity_options')}
}]
export default questionsConfig;