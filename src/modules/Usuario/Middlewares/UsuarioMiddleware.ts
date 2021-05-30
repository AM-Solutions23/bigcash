import express from 'express';
import jwt from 'jsonwebtoken';

const ValidateUsuarios = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) =>{
     // do stuff here
     const token_ = req.headers('auth-token');
     if(token_){

     }else{
         
     }
}


export default ValidateUsuarios;