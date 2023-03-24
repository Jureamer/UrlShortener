import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class RecaptchaGuard implements CanActivate {
    constructor(private readonly configService: ConfigService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { body } = context.switchToHttp().getRequest()
        const VERIFY_URL = this.configService.get<string>('RECAPTCHA_VERIFY_URL')
        const RECAPTCHA_SECRET = this.configService.get<string>('RECAPTCHA_SECRET')
        const { data } = await axios.post(`${VERIFY_URL}?response=${body.token}&secret=${RECAPTCHA_SECRET}`)

        // 토큰 에러로 인한 요청 거부 처리하기
        if (!data.success) {
            throw new ForbiddenException()
        }

        return true
    }
}
