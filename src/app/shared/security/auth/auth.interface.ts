import { User } from '../../interfaces/user.interface';

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ForgotPasswordEmailDTO {
  email: string;
}

export interface ForgotPasswordRecoverDTO {
  email: string;
  token: string;
}

export interface ForgotPasswordResetDTO {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface TokenDTO {
  token: string;
  access_token: string;
  user: User;
  refresh_token?: string;
}
