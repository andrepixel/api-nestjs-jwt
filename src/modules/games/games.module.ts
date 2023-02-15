import { Module, NestModule } from '@nestjs/common';
import { GetAllGamesService } from './get_all/games_get_all.service';
import { GetAllGamesController } from './get_all/games_get_all.controller';

@Module({
  controllers: [GetAllGamesController],
  providers: [GetAllGamesService],
})
export class GamesModule {}
