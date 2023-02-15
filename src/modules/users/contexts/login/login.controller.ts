import {
  Body,
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginUserRequestDTO } from 'shared/dtos/users.dto';
import { LoginService } from './login.service';

@Controller('users')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @Get('login')
  @HttpCode(HttpStatus.OK)
  async handler(@Body() user: LoginUserRequestDTO) {
    try {
      return await this.service.execute(user);
    } catch (error) {
      throw new InternalServerErrorException({
        error: [error.message],
      });
    }
  }
}
