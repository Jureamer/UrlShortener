import { Injectable } from '@nestjs/common'
import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston'

const { combine, timestamp } = winston.format

@Injectable()
export class LoggerService {
    private logger: winston.Logger

    constructor(service: string) {
        this.logger = winston.createLogger({
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: combine(
                        timestamp({ format: 'isoDateTime' }),
                        nestWinstonModuleUtilities.format.nestLike(service, {
                            prettyPrint: true,
                        }),
                    ),
                }),
            ],
        })
    }

    error(message: string, trace?: string) {
        this.logger.error(message, trace)
    }

    warn(message: string) {
        this.logger.warn(message)
    }

    info(message: string) {
        this.logger.info(message)
    }

    debug(message: string) {
        this.logger.debug(message)
    }

    verbose(message: string) {
        this.logger.verbose(message)
    }
}
