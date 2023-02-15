import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../shared/dtos/repositories/users.repository';
import { LoginUserRequestDTO } from 'shared/dtos/users.dto';
import { LoginUserResponseDTO } from '../../../../shared/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import env from '@config/env';

@Injectable()
export class LoginService {
  constructor(private readonly repository: UsersRepository) {}

  public async execute(
    user: LoginUserRequestDTO,
  ): Promise<LoginUserResponseDTO> {
    try {
      if (user.username === undefined) {
        throw new Error('username is required');
      }

      if (user.password === undefined) {
        throw new Error('password is required');
      }

      const userDatabase = await this.repository.getUser(user);

      const isPasswordEquals = await bcrypt.compare(
        user.password,
        userDatabase.password,
      );

      if (!isPasswordEquals) {
        throw new Error('user or password is not valid');
      }

      const token = await jwt.sign(userDatabase, env.application.key_jwt, {
        subject: userDatabase.id,
        expiresIn: '20s',
      });

      const responseUser = new LoginUserResponseDTO({
        id: userDatabase.id,
        name: userDatabase.name,
        username: userDatabase.username,
        password: userDatabase.password,
        token: token,
      });

      return responseUser;
    } catch (error) {
      throw error;
    }
  }
}
