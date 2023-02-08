import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'shared/dtos/createuser.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'shared/dtos/repositories/createuser.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly repository: UsersRepository) {}

  public async execute(user: CreateUserDTO): Promise<any> {
    user.password = await bcrypt.hash(user.password, 10);

    return this.repository.createUser(user);
  }
}
