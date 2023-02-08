import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetUsersService } from './get_users.service';

@Controller('users')
export class GetUsersController {
  constructor(private readonly service: GetUsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public async handler() {
    return this.service.execute();
  }
}
