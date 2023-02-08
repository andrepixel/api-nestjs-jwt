import { Module } from '@nestjs/common';
import { CreateUserDTO } from '../../shared/dtos/createuser.dto';
import { CreateUserController } from './contexts/create_user/create_user.controller';
import { CreateUserService } from './contexts/create_user/create_user.service';
import { UsersRepository } from 'shared/dtos/repositories/createuser.repository';
import { GetUsersController } from './contexts/get_users/get_users.controller';
import { GetUsersService } from './contexts/get_users/get_users.service';

@Module({
  controllers: [CreateUserController, GetUsersController],
  providers: [
    CreateUserService,
    CreateUserDTO,
    UsersRepository,
    GetUsersService,
  ],
})
export class UsersModule {}
