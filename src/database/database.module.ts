import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MikroOrmModule } from '@mikro-orm/nestjs'
import { FlushMode } from '@mikro-orm/core/enums'
import { Url } from 'src/comp/entity/comp.entity'

@Module({
    imports: [
        MikroOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dbName: configService.get('DATABASE_NAME'),
                user: configService.get('DATABASE_USER_NAME'),
                host: configService.get('DATABASE_HOST'),
                password: configService.get('DATABASE_PASSWORD'),
                type: configService.get('DATABASE_TYPE'),
                autoLoadEntities: true,
                flushMode: FlushMode.COMMIT,
                debug: true,
            }),
        }),
    ],
})
export class DatabaseModule {}
