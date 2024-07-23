import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Enum } from "../../domain/entities/entities.log";



export class MongoLogsDataSource implements LogDataSource{

    

    async saveLog(log: LogEntity): Promise<void> {
        await LogModel.create(log)
        console.log("created log");
        
    }
    async getLogs(severityLevel: Enum): Promise<LogEntity[]> {
        const logs=await LogModel.find({level:severityLevel})

        return logs.map(LogEntity.fromObject)
    }

    
}