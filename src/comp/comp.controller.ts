import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { CompService } from './comp.service'
import { Url } from './entity/comp.entity'

@Controller('comp')
export class CompController {
    constructor(private readonly compService: CompService) {}

    @Post()
    async shortenUrl(@Body('url') url: string) {
        const shortUrl = await this.compService.shortenUrl(url)
        return { shortUrl: shortUrl }
    }
}
