import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = uuidv4();
    req['requestId'] = requestId;

    this.logger.log(`Request ${requestId}: ${req.method} ${req.originalUrl}`);
    next();
  }
}
