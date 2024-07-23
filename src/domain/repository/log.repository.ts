import { Enum, LogEntity } from "../entities/entities.log";

export abstract class LogRepository{
    abstract saveLog(log:LogEntity):Promise<void>;
    abstract getLogs(severityLevel:Enum):Promise<LogEntity[]>;
}