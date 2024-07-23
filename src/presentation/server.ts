import { MongoDataBase } from "../data/mongo/init";
import { Enum } from "../domain/entities/entities.log";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastucture/datasources/file-system.datasource";
import { MongoLogsDataSource } from "../infrastucture/datasources/mongo-log.datasources";
import { PostgresLogDatasources } from "../infrastucture/datasources/postgres-log-datasources";
import { LogRepositoryImpl } from "../infrastucture/repository/log.repository.impl";
import { CronService } from "./cron/cron-services";
import { EmailService } from "./emails/nodemailer-services";


const logRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    // new MongoLogsDataSource()
    new PostgresLogDatasources()
)
const emailService = new EmailService()


export class Server {

    public static async start() {

        // const sentEmail = new SendEmailLogs(logRepository, emailService).execute(["lildan659@gmail.com", "santi-dy240@hotmail.com"])

        // const logs=await logRepository.getLogs(Enum.low)
        // console.log(logs);
        

        const url = "https://www.google.com"

        const job = CronService.Crobjob("* * * * * *", () => new CheckService(
            logRepository,
            () => console.log(`${url} is ok!`),
            (error) => console.log(error)
        ).excute(url))

        job.start()

    }
}