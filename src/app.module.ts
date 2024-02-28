import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilModule } from './util/util.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpTimeoutInterceptor } from './util/interceptors/http-timeout/http-timeout.interceptor';

@Module({
  imports: [UtilModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpTimeoutInterceptor,
    },
  ],
})
export class AppModule {}
