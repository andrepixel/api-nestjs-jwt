import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationRouteMiddleware } from 'shared/middlewares/authentication_route.middleware';
import { GamesModule } from './modules/games/games.module';
import { GetAllGamesController } from 'modules/games/get_all/games_get_all.controller';
import { TokenModule } from 'modules/token/contexts/token.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    UsersModule,
    GamesModule,
    TokenModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    try {
      consumer
        .apply(AuthenticationRouteMiddleware)
        .forRoutes(GetAllGamesController);
    } catch (error) {
      throw error;
    }
  }
}
