import {Log} from './../modules/Auth/Entities/Log';
import {getRepository, createConnection} from 'typeorm';

export const createLOG = async (logObj:Object) => {
        const logRepo = getRepository(Log);
        return await logRepo.save(Object.assign(new Log(), logObj));
}

export const getLOG = async (params:Object) => {
    const logRepo = getRepository(Log);
    return await logRepo.find(params);
}