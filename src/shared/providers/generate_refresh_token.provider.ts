import env from '@config/env';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GenerateRefreshTokenProvider {
  async execute(userID: string): Promise<string> {
    const token = jwt.sign({}, env.application.KEY_JWT, {
      subject: userID,
      expiresIn: '20s',
    });

    return token;
  }
}
