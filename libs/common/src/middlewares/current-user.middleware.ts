import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
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
    const sessionJWT = req.session?.jwt;

    try {
      if (!sessionJWT) throw new Error();
      const payload = jwt.verify(
        sessionJWT,
        process.env.JWT_KEY!,
      ) as UserPayload;

      req.currentUser = payload;
    } catch (error) {
      req.currentUser = null;
    }

    next();
  }
}
