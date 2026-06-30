export interface CLICode {
  id: string;
  code: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
}

export interface CLIVerifyRequest {
  code: string;
}

export interface CLIVerifyResponse {
  success: boolean;
  token?: string;
  message: string;
}

export interface CLIChatRequest {
  token: string;
  message: string;
  model?: string;
}

export interface CLIChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}
