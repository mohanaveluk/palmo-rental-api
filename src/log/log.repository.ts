import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogRepository extends Repository<Log> {
  constructor(dataSource: DataSource) {
    super(Log, dataSource.createEntityManager());
  }

  async logAction(action: string, details: string, userId: string): Promise<Log> {
    const log = this.create({
      action,
      details,
      userId,
    });
    return this.save(log);
  }
}