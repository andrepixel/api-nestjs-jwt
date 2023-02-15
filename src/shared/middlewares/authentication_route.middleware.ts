import {
  Injectable,
  NestMiddleware,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import env from '@config/env';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthenticationRouteMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authToken = req.headers.authorization;

      if (!authToken) {
        throw new Error('No authorization header found');
      }

      const [, token] = authToken.split(' ');

      const payload = verify(token, env.application.KEY_JWT);

      return next();
    } catch (error) {
      throw new InternalServerErrorException({
        error: [error.message],
      });
    }
  }
}
