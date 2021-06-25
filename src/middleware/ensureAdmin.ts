import { getCustomRepository } from 'typeorm';
import { NextFunction, Request, Response } from "express";
import { UsersRepositories } from '../repositories/UsersRepositories';

  export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const { user_id } = request;
  console.log(user_id);

  const userRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await userRepositories.findOne(user_id); 

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized",
  }); // unauthorized
}
