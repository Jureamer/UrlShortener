import { Controller, Post, Body, Get } from '@nestjs/common'
import { CompService } from './comp.service'
import { Url } from './entity/comp.entity'

@Controller('comp')
export class CompController {
    constructor(private readonly compService: CompService) {}

    @Post()
    async shortenUrl(): Promise<{ shortUrl: Url }> {
        const shortUrl = await this.compService.shortenUrl('http://localhost:3000/')
        return { shortUrl }
    }

    @Get()
    async getShortUrl(): Promise<{ urls: string[] }> {
        const urls = await this.compService.getShortUrl('http://localhost:3000/')
        return { urls }
    }
}
