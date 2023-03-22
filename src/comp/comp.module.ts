import { MikroOrmModule } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/mysql'
import { Module } from '@nestjs/common'
import { CompController } from './comp.controller'
import { CompService } from './comp.service'
import { Url } from './entity/comp.entity'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
    imports: [ConfigModule, HttpModule, MikroOrmModule.forFeature([Url])],
    controllers: [CompController],
    providers: [ConfigService, CompService, EntityRepository],
})
export class CompModule {}
