import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), HealthModule, UsersModule],
})
export class AppModule {}
