import { LoggerService } from './../common/middlewares/logger.service'
import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { CompService } from './comp.service'
import { Recaptcha } from '@nestlab/google-recaptcha'
@Controller('comp')
@Recaptcha()
export class CompController {
    constructor(private readonly compService: CompService) {}

    @Post()
    async shortenUrl(@Body() params) {
        const shortUrl = await this.compService.shortenUrl(params)
        console.log(`shortUrl: ${shortUrl}`)
        if (!shortUrl) {
            return { status: 400, message: '유효한 URL이 아닙니다.', data: null }
        }
        return { status: 200, message: 'URL이 정상적으로 압축되었습니다.', data: shortUrl }
    }
}
