
export enum Enum {
    low = "low",
    medium = "medium",
    high = "high",

}

export interface LogEntityOptions {
    level: Enum
    message: string
    date?: Date
    origin: string
}

export class LogEntity {

    public level: Enum
    public message: string
    public date: Date
    public origin: string

    constructor(options: LogEntityOptions) {
        const { level, message, origin, date = new Date() } = options
        this.level = level
        this.message = message
        this.date = date
        this.origin = origin
    }

    static fromJSON(json: string): LogEntity {

        json = json === "" ? '{}' : json
        const { level, message, date, origin } = JSON.parse(json)
        const log = new LogEntity({ level, message, date, origin })
        return log
    }

    static fromObject(object: { [key: string]: any }) {
        const { level, origin, message, date } = object
        const log = new LogEntity({ level, origin, message, date })

        return log
    }

}