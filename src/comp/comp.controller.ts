import { Controller, Post, Body, Get } from '@nestjs/common'
import { CompService } from './comp.service'

@Controller('comp')
export class CompController {
  constructor(private readonly compService: CompService) {}

  @Post('')
  async shortenUrl(): Promise<{ shortUrl: string }> {
    const shortUrl = await this.compService.shortenUrl('http://localhost:3000/')
    return { shortUrl }
  }

  @Get('')
  async getUrls(): Promise<{ urls: string[] }> {
    const urls = await this.compService.getUrls()
    return { urls }
  }
}
