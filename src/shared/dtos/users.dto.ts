export class CreateUserDTO {
  name: string;
  username: string;
  password: string;
}

export class LoginUserRequestDTO {
  username: string;
  password: string;
}

export class LoginUserResponseDTO {
  id: string;
  name: string;
  username: string;
  password: string;
  token: string;

  constructor({
    id,
    name,
    username,
    password,
    token,
  }: {
    id: string;
    name: string;
    username: string;
    password: string;
    token: string;
  }) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.token = token;
  }
}
