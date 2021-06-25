import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
){
    // receber o token
    const authToken = request.headers.authorization;
    
    // validar se token esta preenchido
    if(!authToken){
        return response.status(401).end();
    }

    const [,token] = authToken.split(" ");

    try{
        const { sub } = verify(token, "2372ff71139f98ede9aab821e3b42ada") as IPayload;

        request.user_id = sub;
        return next();
    } catch (err){
        return response.status(401).end();
    }
   

   

    // validar se token e valido

    // recuperar informações do usuario
}