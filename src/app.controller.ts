import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LoggerService } from './logger.service';
import { Logger } from '@nestjs/common';

@Controller()
export class AppController {
  private logger = new Logger();
  constructor(
    private readonly appService: AppService,
    private readonly loggerService: LoggerService,
  ) {}

  @Get()
  getHello(): string {
    try {
      return this.appService.getHello();
    } catch (error) {
      // console.log(error.stack);
      this.loggerService.error(error.message, error);
      // this.logger.error(error.message, error.stack);
      return error.message;
    }

    // this.loggerService.error('Hello, Loggin Over here', 'trace');
  }
}
