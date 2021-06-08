import {Log, LogType} from './../modules/Auth/Entities/Log';
import {getRepository, createConnection} from 'typeorm';

export const createLOG = async (logObj:Object) => {
   await createConnection().then(async connection =>{
        const logRepo = connection.getRepository(Log);
        const logInstance = new Log();
    
        logInstance.action_key = logObj['action_key'] || null;
        logInstance.usuario = logObj['usuario'] || null;
        logInstance.tipo = LogType[`${logObj['action_key'] || null}`];
        logInstance.user_ip = logObj['user_ip'] || null;
        logInstance.user_coordenadas = logObj['user_coordenadas'] || null;
        logInstance.user_device = logObj['user_device'] || null;
        logInstance.module = logObj['module'] || null;
        logInstance.status = logObj['status'] || null;
        logInstance.erro = logObj['erro'] || null;
       
        return await logRepo.save(logInstance);
    })

}

export const getLOG = async (params:Object) => {
    await createConnection().then(async connection =>{
        const logRepo = connection.getRepository(Log);
    return await logRepo.find(params);
    });
}