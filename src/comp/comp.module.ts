import { LoggerService } from '../common/middlewares/logger.service'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { EntityRepository } from '@mikro-orm/mysql'
import { Module } from '@nestjs/common'
import { CompController } from './comp.controller'
import { CompService } from './comp.service'
import { Url } from './entity/comp.entity'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'

@Module({
    imports: [MikroOrmModule.forFeature([Url])],
    controllers: [CompController],
    providers: [CompService, EntityRepository],
})
export class CompModule {}
