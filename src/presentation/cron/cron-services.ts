import { CronJob } from "cron";

type CronTime = string | Date
type CronTick = () => void


export class CronService {
    public static Crobjob(cronTime:CronTime, cronTick:CronTick) {

        const job = new CronJob(cronTime,cronTick)
        job.start()

        return job
    }

}