import { Enum, LogEntity } from "../../entities/entities.log"
import { LogRepository } from "../../repository/log.repository"

interface CheckServiceUseCase {
    excute(url: string): Promise<boolean>
}

type SuccesCallback = () => void
type ErrorCallback = (error: string) => void



export class CheckService implements CheckServiceUseCase {



    constructor(
        private readonly logRepositiry: LogRepository,
        private readonly succesCallback: SuccesCallback,
        private readonly errorCallback: ErrorCallback) {

    }
    public async excute(url: string): Promise<boolean> {
        try {
            const res = await fetch(url)

            if (!res.ok) throw new Error(`could not conect to URL:${url}`)

            const optionLog = {
                level: Enum.low,
                message: `Service ${url} working`,
                origin: __filename
            }


            const log = new LogEntity(optionLog)
            this.logRepositiry.saveLog(log)
            this.succesCallback()
            return true

        } catch (error) {
            const errorMessage = error
            const optionLog = {
                level: Enum.high,
                message: `${errorMessage}`,
                origin: __filename
            }
            const log = new LogEntity(optionLog)
            this.logRepositiry.saveLog(log)
            this.errorCallback(`${errorMessage}`)
            return false
        }
    }
}
