import { PrismaClient, prisma, users } from '@prisma/client';
import { CreateUserDTO, LoginUserRequestDTO } from '../users.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  public async getUsers(): Promise<any> {
    const prisma = new PrismaClient();

    try {
      await prisma.$connect();

      const responseUser = prisma.users.findMany();

      return responseUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUser(user: LoginUserRequestDTO): Promise<users> {
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
    }
  }

  public async createUser(user: CreateUserDTO): Promise<any> {
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

      return responseUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}
