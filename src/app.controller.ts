import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    this.loggerService.log('Hello, Loggin Over here');
    return this.appService.getHello();
  }
}
