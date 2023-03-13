import { HttpExceptionFilter } from './common/filters/httpException.filter'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { AppModule } from './app.module'
import { UndefinedNullInterceptor } from './common/interceptors/undefined.null.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    app.useGlobalInterceptors(new UndefinedNullInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))

    await app.listen(3000)
}
bootstrap()
