import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GenerateRefreshTokenProvider } from 'shared/providers/generate_refresh_token.provider';

@Injectable()
export class GenerateRefreshTokenRepository {
  public async execute(refreshTokenID: string): Promise<string> {
    const prisma = new PrismaClient();

    try {
      const refreshToken = await prisma.refresh_Token.findFirst({
        where: {
          id: refreshTokenID,
        },
      });

      if (refreshToken === null) {
        throw new Error('Refresh token is invalid');
      }

      const generateToken = new GenerateRefreshTokenProvider();
      const token = await generateToken.execute(refreshToken.userID);

      return token;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect;
    }
  }
}
