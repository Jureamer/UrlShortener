import { LoggerService } from './common/middlewares/logger.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompModule } from './comp/comp.module'
import { WinstonModule, WINSTON_MODULE_NEST_PROVIDER, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { CompService } from './comp/comp.service'
import { EntityRepository } from '@mikro-orm/mysql'
import { Url } from './comp/entity/comp.entity'
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
        MikroOrmModule.forFeature([Url]),
    ],
    controllers: [AppController],
    providers: [AppService, CompService, EntityRepository],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
