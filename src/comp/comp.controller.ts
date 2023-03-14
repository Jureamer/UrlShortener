import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { CompService } from './comp.service'

@Controller('comp')
export class CompController {
    constructor(private readonly compService: CompService) {}

    @Post()
    async shortenUrl(@Body('url') url: string) {
        const shortUrl = await this.compService.shortenUrl(url)

        if (!shortUrl) {
            return { status: 400, message: '유효한 URL이 아닙니다.', data: null }
        }
        return { status: 200, message: 'URL이 정상적으로 압축되었습니다.', data: shortUrl }
    }
}
