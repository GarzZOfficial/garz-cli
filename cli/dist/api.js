import axios from 'axios';
export class APIClient {
    constructor(baseUrl = 'https://garz-ai.vercel.app') {
        this.baseUrl = baseUrl;
    }
    async verifyCLICode(code) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/cli/verify`, { code }, { timeout: 10000 });
            return response.data;
        }
        catch (error) {
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
    async sendMessage(token, message, model) {
        try {
            const response = await axios.post(`${this.baseUrl}/api/cli/chat`, { token, message, model }, { timeout: 30000 });
            return response.data;
        }
        catch (error) {
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
