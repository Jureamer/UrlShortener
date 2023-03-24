import { DatabaseModule } from './database/database.module'
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
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CompModule,
        HealthModule,
        DatabaseModule,
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
