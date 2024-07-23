import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Enum } from "../../domain/entities/entities.log";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(private readonly logDataSource:LogDataSource){}

   async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log)
    }
   async getLogs(severityLevel: Enum): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(severityLevel)
    }
}