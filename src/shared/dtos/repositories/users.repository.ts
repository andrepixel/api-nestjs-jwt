import { PrismaClient, Refresh_Token, Users } from '@prisma/client';
import { CreateUserDTO, LoginUserRequestDTO } from '../users.dto';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { prisma } from '../../../../prisma';

@Injectable()
export class UsersRepository {
  public async getUsers(): Promise<Users[]> {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();

      const responseUser = prisma.users.findMany();

      return responseUser;
    } catch (error) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async getUser(user: LoginUserRequestDTO): Promise<Users> {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();

      const responseUser = prisma.users.findFirst({
        where: {
          username: user.username,
        },
      });

      return responseUser;
    } catch (error) {
      throw new Error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async createUser(user: CreateUserDTO): Promise<Users> {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();

      const responseUser = prisma.users.create({
        data: {
          name: user.name,
          username: user.username,
          password: user.password,
        },
      });

      if (responseUser === null) {
        throw new Error('Account already exists');
      }

      return responseUser;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async refresh_token(userID: string): Promise<Refresh_Token> {
    try {
      const expiresIn = dayjs().add(1, 'second').unix();

      const isUserIdExists = await prisma.refresh_Token.findFirst({
        where: {
          userID: userID,
        },
      });

      if (isUserIdExists) {
        await prisma.refresh_Token.delete({
          where: {
            userID: userID,
          },
        });
      }

      const refreshToken = await prisma.refresh_Token.create({
        data: {
          userID: userID,
          expiresIn: expiresIn,
        },
      });

      return refreshToken;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }
}
