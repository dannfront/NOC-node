import { EmailService } from "../../../presentation/emails/nodemailer-services"
import { Enum, LogEntity } from "../../entities/entities.log"
import { LogRepository } from "../../repository/log.repository"

interface SendLogEmailUseCase {
    execute: (to: string | string[]) => Promise<boolean>
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly emailService: EmailService
    ) { }


    async execute(to: string | string[]) {
        try {

            const sent =  this.emailService.sendMailWithFileSistmLogs(to)

            if(!sent) throw new Error("email not sent")

            const log = new LogEntity({
                level: Enum.low,
                message: "email send",
                origin: "nodemailer_services.ts"
            })

            this.logRepository.saveLog(log)
            return true
        } catch (error) {

            const log = new LogEntity({
                level: Enum.high,
                message: `${error}`,
                origin: "nodemailer_services.ts"
            })

            this.logRepository.saveLog(log)
            return false
        }
    };

}