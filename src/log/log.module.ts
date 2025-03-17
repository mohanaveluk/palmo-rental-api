import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { LogRepository } from './log.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogRepository],
  exports: [LogRepository],
})
export class LogModule {}