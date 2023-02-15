import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllGamesService {
  public async execute(): Promise<any> {
    try {
      return {
        games: [
          "Harry Potter and the Philosopher's Stone",
          'Grand Theft Auto V',
          'Pokemon',
        ],
      };
    } catch (error) {
      return error;
    }
  }
}
