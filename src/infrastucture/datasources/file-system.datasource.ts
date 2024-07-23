import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, Enum } from "../../domain/entities/entities.log";


export class FileSystemDataSource implements LogDataSource {

    private readonly logPath = "logs/"
    private readonly allLogspath = "logs/logs-low.log"
    private readonly mediumLogspath = "logs/logs-medium.log"
    private readonly highLogsPath = "./logs/logs-high.log"

    constructor() {
        fs.mkdir(this.logPath, { recursive: true }, (err) => {
            if (err) return console.log("error alcrear elarchivo");

            console.log("archivo creado");

            [
                this.allLogspath,
                this.mediumLogspath,
                this.highLogsPath
            ].forEach(path => {
                if (fs.existsSync(path)) return
                fs.writeFileSync(path, "")
            });

        })

    }

    async saveLog(log: LogEntity): Promise<void> {

        const logAsJson = `${JSON.stringify(log)}\n`

        fs.appendFileSync(this.allLogspath, logAsJson)

        if (log.level === Enum.low) return

        if (log.level === Enum.medium) {
            fs.appendFileSync(this.mediumLogspath, logAsJson)
        } else {
            fs.appendFileSync(this.highLogsPath, logAsJson)
        }
    }

    private getLogsFromFile(path: string): LogEntity[] {
        console.log(path);
        
        const content = fs.readFileSync(path, 'utf8')
        if(content==="") return[]
        const logs = content.split('\n').map(json => LogEntity.fromJSON(json))

        return logs
    }

    async getLogs(severityLevel: Enum): Promise<LogEntity[]> {

        switch (severityLevel) {
            case Enum.low:
                return this.getLogsFromFile(this.allLogspath)
            case Enum.medium:
                return this.getLogsFromFile(this.mediumLogspath)
            case Enum.high:
                return this.getLogsFromFile(this.highLogsPath)

            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }

}