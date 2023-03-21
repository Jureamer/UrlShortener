import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { CompModule } from './comp/comp.module'
import { WinstonModule } from 'nest-winston'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { CompService } from './comp/comp.service'
import { EntityRepository } from '@mikro-orm/mysql'
import { Url } from './comp/entity/comp.entity'
import { HealthModule } from './health/health.module'
import { winstonConfig, WORKING_DIR } from '..'
import * as MikroOrmConfig from '../mikro-orm.config'
import { ConfigModule } from '@nestjs/config'
import { getEnvPath } from './common/env-loader/env-files/env-helper'
const envFilePath: string = getEnvPath(WORKING_DIR + 'src/common/env-loader/env-files')

@Module({
    imports: [
        CompModule,
        HealthModule,
        ConfigModule.forRoot({
            envFilePath,
            isGlobal: true,
        }),
        MikroOrmModule.forRoot(MikroOrmConfig.default),
        MikroOrmModule.forFeature([Url]),
        WinstonModule.forRoot(winstonConfig()),
    ],
    controllers: [AppController],
    providers: [CompService, EntityRepository],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*')
    }
}
