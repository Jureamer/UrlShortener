import { join } from 'path'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { appGlobalConfig, WORKING_DIR } from '..'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)
    const configService = app.get(ConfigService)
    const HOST = configService.get<string>('SERVER_HOST')
    const PORT = configService.get<number>('SERVER_PORT')
    appGlobalConfig(app)
    app.enableCors()
    app.setViewEngine('pug')
    app.useStaticAssets(join(WORKING_DIR, 'public'))
    app.setBaseViewsDir(join(WORKING_DIR, 'views'))

    await app.listen(PORT, () => {
        Logger.log(`Nest listening on ${HOST}:${PORT}`, 'Bootstrap')
    })
}

bootstrap()
