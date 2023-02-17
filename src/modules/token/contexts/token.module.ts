import { Module } from '@nestjs/common';
import { RefreshTokenController } from './refresh_token/refresh_token.controller';
import { RefreshTokenService } from './refresh_token/refresh_token.service';
import { GenerateRefreshTokenRepository } from 'shared/dtos/repositories/generate_refresh_token.repository';

@Module({
  controllers: [RefreshTokenController],
  providers: [RefreshTokenService, GenerateRefreshTokenRepository],
})
export class TokenModule {}
