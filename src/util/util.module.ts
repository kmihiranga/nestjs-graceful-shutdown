import { Module } from '@nestjs/common';
import { HealthService } from './health/health/health.service';
import { HealthController } from './health/health/health.controller';
import { ShutdownService } from './shutdown/shutdown.service';

@Module({
  providers: [HealthService, ShutdownService],
  controllers: [HealthController],
})
export class UtilModule {}
