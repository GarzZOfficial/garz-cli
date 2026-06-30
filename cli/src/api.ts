import axios from 'axios';

interface VerifyCodeResponse {
  success: boolean;
  token?: string;
  message: string;
}

interface ChatResponse {
  success: boolean;
  response?: string;
  error?: string;
}

export class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://garz-ai.vercel.app') {
    this.baseUrl = baseUrl;
  }

  async verifyCLICode(code: string): Promise<VerifyCodeResponse> {
    try {
      const response = await axios.post<VerifyCodeResponse>(
        `${this.baseUrl}/api/cli/verify`,
        { code },
        { timeout: 10000 }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.message || 'Failed to verify code',
        };
      }
      return {
        success: false,
        message: 'Network error. Check your internet connection.',
      };
    }
  }

  async sendMessage(token: string, message: string, model?: string): Promise<ChatResponse> {
    try {
      const response = await axios.post<ChatResponse>(
        `${this.baseUrl}/api/cli/chat`,
        { token, message, model },
        { timeout: 30000 }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          error: error.response?.data?.error || 'Failed to send message',
        };
      }
      return {
        success: false,
        error: 'Network error. Check your internet connection.',
      };
    }
  }
}
