import { PrismaClient } from '@prisma/client';
import { CreateUserDTO } from '../createuser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
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
