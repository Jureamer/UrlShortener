import { join } from 'path'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'
import { appGlobalConfig, HOSTNAME, PORT, WORKING_DIR } from '..'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    appGlobalConfig(app)
    app.useStaticAssets(join(WORKING_DIR, 'public'))
    app.setBaseViewsDir(join(WORKING_DIR, 'views'))
    app.setViewEngine('pug')

    await app.listen(PORT, HOSTNAME, () => {
        Logger.log(`Nest listening on http://${HOSTNAME}:${PORT}`, 'Bootstrap')
    })
}

bootstrap()
