import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserService } from './create_user.service';
import { CreateUserDTO } from 'shared/dtos/users.dto';

@Controller('users')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handler(@Body() user: CreateUserDTO) {
    return this.service.execute(user);
  }
}
