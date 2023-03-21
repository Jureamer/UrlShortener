import { ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'

import * as cookieParser from 'cookie-parser'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { HttpExceptionFilter } from '../../filters'
import { UndefinedNullInterceptor } from '../../interceptors'

export function appGlobalConfig(app: NestExpressApplication): void {
    app.use(cookieParser())
    app.useGlobalInterceptors(new UndefinedNullInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            validationError: { target: false },
        }),
    )
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
}
