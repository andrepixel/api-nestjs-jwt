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
  token: string;
  refresh_token?: RefreshTokenDTO;

  constructor({
    token,
    refresh_token,
  }: {
    token: string;
    refresh_token?: RefreshTokenDTO;
  }) {
    this.token = token;
    this.refresh_token = refresh_token;
  }
}

export class RefreshTokenDTO {
  id: string;
  expiresIn: number;
  userID: string;

  constructor({
    id,
    expiresIn,
    userID,
  }: {
    id: string;
    expiresIn: number;
    userID: string;
  }) {
    this.id = id;
    this.expiresIn = expiresIn;
    this.userID = userID;
  }
}

export class RefreshTokenRequestBodyDTO {
  refresh_token: string;

  constructor({ refresh_token }: { refresh_token: string }) {
    this.refresh_token = refresh_token;
  }
}

export class RefreshTokenResponseBodyDTO {
  responseToken: LoginUserResponseDTO;

  constructor({ responseToken }: { responseToken: LoginUserResponseDTO }) {
    this.responseToken = responseToken;
  }
}
