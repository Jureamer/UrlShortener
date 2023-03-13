import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompModule } from './comp/comp.module'
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'
import { LoggerMiddleware } from './lib/logger.middleware'
@Module({
    imports: [
        CompModule,
        MikroOrmModule.forRoot(),
        WinstonModule.forRoot({
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
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
