import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { GenerateRefreshTokenProvider } from 'shared/providers/generate_refresh_token.provider';
import * as dayjs from 'dayjs';
import { LoginUserResponseDTO } from '../users.dto';

@Injectable()
export class GenerateRefreshTokenRepository {
  public async execute(refreshTokenID: string): Promise<LoginUserResponseDTO> {
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

      const isRefreshTokenExpired = dayjs().isAfter(
        dayjs.unix(refreshToken.expiresIn),
      );

      const generateToken = new GenerateRefreshTokenProvider();
      const token = await generateToken.execute(refreshToken.userID);

      if (isRefreshTokenExpired) {
        await prisma.refresh_Token.deleteMany({
          where: {
            userID: refreshToken.userID,
          },
        });

        const generateToken = new GenerateRefreshTokenRepository();
        const newRefreshToken = await generateToken.execute(
          refreshToken.userID,
        );

        return new LoginUserResponseDTO({
          token: newRefreshToken.token,
          refresh_token: newRefreshToken.refresh_token,
        });
      }

      return new LoginUserResponseDTO({
        token: token,
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
