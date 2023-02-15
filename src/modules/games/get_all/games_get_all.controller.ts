import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetAllGamesService } from './games_get_all.service';

@Controller('games')
export class GetAllGamesController {
  constructor(private readonly service: GetAllGamesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async handler(): Promise<any> {
    return await this.service.execute();
  }
}
