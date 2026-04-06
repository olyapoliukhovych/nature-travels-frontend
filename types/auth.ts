export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export type LoginParams = Omit<RegisterParams, "name">;

export interface LogoutResponse {
  message: string;
}

export interface RefreshSessionResponse {
  success: boolean;
}
