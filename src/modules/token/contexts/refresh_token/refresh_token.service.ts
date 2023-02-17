import { Injectable } from '@nestjs/common';
import { GenerateRefreshTokenRepository } from '../../../../shared/dtos/repositories/generate_refresh_token.repository';
import {
  RefreshTokenRequestBodyDTO,
  RefreshTokenResponseBodyDTO,
} from '../../../../shared/dtos/users.dto';

@Injectable()
export class RefreshTokenService {
  constructor(private readonly repository: GenerateRefreshTokenRepository) {}

  public async execute(
    refreshTokenID: RefreshTokenRequestBodyDTO,
  ): Promise<RefreshTokenResponseBodyDTO> {
    const refreshToken = await this.repository.execute(
      refreshTokenID.refresh_token,
    );

    const responseRefreshToken = new RefreshTokenResponseBodyDTO({
      responseToken: refreshToken,
    });

    return responseRefreshToken;
  }
}
