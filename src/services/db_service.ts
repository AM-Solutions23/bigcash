import * as glob from 'glob';
import {createConnection, getConnection} from "typeorm";

export class dbConnectionService{
    private connection;

    public async createDBConnection(){
        return await createConnection({
                    "type": "mysql",
                    "host": "localhost",
                    "port": 3306,
                    "username": "root",
                    "password": "",
                    "database": "gyan",
                    "synchronize": true,
                    "logging": false,
                    "entities": [
                        __dirname + '/../modules/**/Entities/*.{ts,js}'
                    ],
                    "migrations": [
                        `${__dirname}/../migration/**/*.ts`
                     ],
                     "subscribers": [
                        `${__dirname}/../subscriber/**/*.ts`
                     ],
                }).catch((error) =>
                    console.log(error)
                );
    }

}



