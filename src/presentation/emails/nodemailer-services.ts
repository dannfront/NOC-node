import nodeMailer from 'nodemailer'
import { env } from '../../config/plugins/env.plugins'
import { LogRepository } from '../../domain/repository/log.repository'
import { Enum, LogEntity } from '../../domain/entities/entities.log'

export interface SendMailOptions {
    to: string|string[],
    subject: string,
    html: string,
    attachments: Attachment[]
}

interface Attachment {
    filename: string,
    path: string
}

export class EmailService {


    private tranporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            user: env.EMAIL,
            pass: env.PASSWORD_EMAIL
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        try {
            await this.tranporter.sendMail(options)
            return true
        } catch (error) {
            return false
        }
    }

    sendMailWithFileSistmLogs(to: string | string[]) {
        const subject="test console logs app"
        const html = `
        <h1>Welcome</h1>
        <p>test test test testtest test testtest test</p>
        <p>test test test testtest test testtest test</p>
        <p>test test test </p>
        `


        const attachments:Attachment[]=[
            {
                filename:"logs-low.log",
                path:"./logs/logs-low.log"
            },
            {
                filename:"logs-high.log",
                path:"./logs/logs-high.log"
            },
            {
                filename:"logs-medium.log",
                path:"./logs/logs-medium.log"
            }
        ]

        return this.sendEmail({to,subject,html,attachments})
        
    }

}