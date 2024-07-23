import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Enum } from "../../domain/entities/entities.log";

const levelPost={
    medium:SeverityLevel.MEDIUM,
    high:SeverityLevel.HIGH,
    low:SeverityLevel.LOW
}

export class PostgresLogDatasources implements LogDataSource {

    private prisma = new PrismaClient()

    async saveLog(log: LogEntity): Promise<void> {

        const {level,origin,date,message}=log

         
    
        await this.prisma.logModel.create({
            data:{
                level:levelPost[level],
                origin,
                timestamp: date,
                message
            }
        })

        console.log("log add to data base");
        
    }
    async getLogs(severityLevel: Enum): Promise<LogEntity[]> {

        const logs= await this.prisma.logModel.findMany({
            where:{
                level:levelPost[severityLevel]
            }
        })

        return logs.map(LogEntity.fromObject)
    }

}