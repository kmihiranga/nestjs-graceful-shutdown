import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class HttpTimeoutInterceptor implements NestInterceptor {
  _logger = new Logger();
  _timeoutValue: number = 2000;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this._timeoutValue),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this._logger.error(
            `request could not completed with in ${this._timeoutValue} seconds(s)`,
          );
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
