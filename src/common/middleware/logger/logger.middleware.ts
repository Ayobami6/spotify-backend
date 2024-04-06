import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const timestamp = new Date().toLocaleString();
    const { baseUrl } = req;
    const message = `Sending request to ${baseUrl} at ${timestamp}`;
    console.log(message);
    next();
  }
}
