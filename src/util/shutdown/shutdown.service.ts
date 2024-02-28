import { INestApplication, Logger } from '@nestjs/common';
import { Server } from 'http';
import { GlobalService } from '../static';

export class ShutdownService {
  private t1: number;
  async initiate(app: INestApplication, server: Server) {
    const _logger = new Logger();

    process.on('SIGTERM', async () => {
      _logger.log('SIGTERM received. Shutdown sequence initiated.');

      // to indicate that service shutdown in progress
      GlobalService.readyForTraffic = false;

      if (!this.t1) this.t1 = new Date().getTime() / 1000;

      server.getConnections((error, count) => {
        _logger.log(`number of active connection(s) : ${count}`);
      });

      await app
        .close()
        .then(() => _logger.log(`app close completed`))
        .catch((e) => _logger.error(e, ` there was an error during app close`));

      const t2 = new Date().getTime() / 1000;
      _logger.log(
        `shutdown process completed. timetaken ${t2 - this.t1} second(s)`,
      );

      // if there is service mesh like linkerd we can call shutdown hook from here.
      process.exit(0);
    });
  }
}
