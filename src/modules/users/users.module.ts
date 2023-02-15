import { Module } from '@nestjs/common';
import { CreateUserDTO } from '../../shared/dtos/users.dto';
import { CreateUserController } from './contexts/create_user/create_user.controller';
import { CreateUserService } from './contexts/create_user/create_user.service';
import { GetUsersController } from './contexts/get_users/get_users.controller';
import { GetUsersService } from './contexts/get_users/get_users.service';
import { LoginController } from './contexts/login/login.controller';
import { UsersRepository } from 'shared/dtos/repositories/users.repository';
import { LoginService } from './contexts/login/login.service';

@Module({
  controllers: [CreateUserController, GetUsersController, LoginController],
  providers: [
    CreateUserService,
    CreateUserDTO,
    UsersRepository,
    GetUsersService,
    LoginService,
  ],
})
export class UsersModule {
  static forRoot(arg0: { envFilePath: string; }): (string | symbol | Function | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").Provider | import("@nestjs/common").ForwardReference<...> | import("@nestjs/common").Abstract<...>)[] {
    throw new Error('Method not implemented.');
  }
}
