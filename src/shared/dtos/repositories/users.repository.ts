import { PrismaClient, Users } from '@prisma/client';
import { CreateUserDTO, LoginUserRequestDTO } from '../users.dto';
import { Injectable } from '@nestjs/common';

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
}
