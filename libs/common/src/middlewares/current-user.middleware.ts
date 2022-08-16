import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface UserPayload {
  id: string;
  email: string;
}

declare module 'express-serve-static-core' {
  interface Request {
    currentUser?: UserPayload | null;
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const cookie = req.cookies['current-user'] || null;

    req.currentUser = cookie ? JSON.parse(cookie) : null;

    next();
  }
}
