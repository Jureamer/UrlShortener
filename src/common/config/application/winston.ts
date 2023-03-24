import { utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'
import { WinstonModuleOptions } from 'nest-winston'

export const winstonConfig = (): WinstonModuleOptions => {
    return {
        transports: [
            new winston.transports.Console({
                level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike('url-shortener', {
                        prettyPrint: true,
                        colors: true,
                    }),
                ),
            }),
        ],
    }
}
