import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  return {
    messagePrefix: process.env.MESSAGE_PREFIX || 'Hello ',
  };
});
