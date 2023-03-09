import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompModule } from './comp/comp.module'

@Module({
    imports: [CompModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
