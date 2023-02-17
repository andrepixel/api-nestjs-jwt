import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../shared/dtos/repositories/users.repository';
import { LoginUserRequestDTO } from 'shared/dtos/users.dto';
import { LoginUserResponseDTO } from '../../../../shared/dtos/users.dto';
import * as bcrypt from 'bcrypt';
import { GenerateRefreshTokenProvider } from '../../../../shared/providers/generate_refresh_token.provider';

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

      const generateToken = new GenerateRefreshTokenProvider();
      const newToken = await generateToken.execute(userDatabase.id);

      const refreshToken = await this.repository.refresh_token(userDatabase.id);

      const responseUser = new LoginUserResponseDTO({
        token: newToken,
        refresh_token: {
          id: refreshToken.id,
          expiresIn: refreshToken.expiresIn,
          userID: refreshToken.userID,
        },
      });

      return responseUser;
    } catch (error) {
      throw error;
    }
  }
}
