import { MikroOrmModule } from '@mikro-orm/nestjs'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { CompModule } from './comp/comp.module'
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston'
import * as winston from 'winston'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { CompService } from './comp/comp.service'
import { EntityRepository } from '@mikro-orm/mysql'
import { Url } from './comp/entity/comp.entity'
import { HealthModule } from './health/health.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
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
