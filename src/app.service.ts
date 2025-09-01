import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly loggerService: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  getHello(): string {
    const prefix = this.configService.get<string>('app.messagePrefix');
    return this.loggerService.log(`${prefix} This is the first service`);
  }
}
