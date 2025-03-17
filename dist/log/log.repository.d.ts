import { Repository, DataSource } from 'typeorm';
import { Log } from './entities/log.entity';
export declare class LogRepository extends Repository<Log> {
    constructor(dataSource: DataSource);
    logAction(action: string, details: string, userId: string): Promise<Log>;
}
