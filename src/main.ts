import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ShutdownService } from './util/shutdown/shutdown.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const server: Server = await app.listen(3000);

  new ShutdownService().initiate(app, server);
  console.log('Process id is ' + process.pid);
}
bootstrap();
