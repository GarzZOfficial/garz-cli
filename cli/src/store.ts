import fs from 'fs';
import path from 'path';
import os from 'os';

interface CLIConfig {
  token: string;
  websiteUrl: string;
  authCode?: string;
  createdAt: string;
}

const getConfigPath = (): string => {
  const configDir = path.join(os.homedir(), '.garz-ai');
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  return path.join(configDir, 'config.json');
};

export const store = {
  getConfig(): CLIConfig | null {
    try {
      const configPath = getConfigPath();
      if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(data);
      }
      return null;
    } catch (error) {
      console.error('Error reading config:', error);
      return null;
    }
  },

  setConfig(config: CLIConfig): void {
    try {
      const configPath = getConfigPath();
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing config:', error);
    }
  },

  clearConfig(): void {
    try {
      const configPath = getConfigPath();
      if (fs.existsSync(configPath)) {
        fs.unlinkSync(configPath);
      }
    } catch (error) {
      console.error('Error clearing config:', error);
    }
  },
};
