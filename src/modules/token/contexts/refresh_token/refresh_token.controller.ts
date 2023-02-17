import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { RefreshTokenService } from './refresh_token.service';
import { RefreshTokenRequestBodyDTO } from 'shared/dtos/users.dto';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly service: RefreshTokenService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handler(@Body() refreshTokenID: RefreshTokenRequestBodyDTO) {
    try {
      return await this.service.execute(refreshTokenID);
    } catch (error) {
      return new InternalServerErrorException({
        error: [error.message],
      });
    }
  }
}
