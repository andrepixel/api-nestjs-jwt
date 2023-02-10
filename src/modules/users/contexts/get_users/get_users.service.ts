import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../../../shared/dtos/repositories/users.repository';

@Injectable()
export class GetUsersService {
  constructor(private readonly repository: UsersRepository) {}

  async execute(): Promise<any> {
    return await this.repository.getUsers();
  }
}
